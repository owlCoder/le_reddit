using Common;
using Common.cloud.account;
using Common.cloud.queue;
using Microsoft.WindowsAzure.ServiceRuntime;
using Microsoft.WindowsAzure.Storage.Queue;
using RedditDataRepository.classes.Logs;
using RedditDataRepository.comments.Read;
using RedditDataRepository.logs.Create;
using RedditDataRepository.queues;
using RedditDataRepository.tables;
using RedditServiceWorker;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;

namespace NotificationService
{
    public class WorkerRole : RoleEntryPoint
    {
        private readonly CancellationTokenSource cancellationTokenSource = new CancellationTokenSource();
        private readonly ManualResetEvent runCompleteEvent = new ManualResetEvent(false);

#pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously
        public async override void Run()
#pragma warning restore CS1998 // Async method lacks 'await' operators and will run synchronously
        {
            Trace.TraceInformation("NotificationService is running");

            CloudQueue queue = AzureQueueHelper.GetQueue("notifications");
            CloudQueue adminQueue = AzureQueueHelper.GetQueue("adminnotificationqueue");
            AlertEmailRepository adminEmailRepo = new AlertEmailRepository();
            try
            {
                RunAsync(this.cancellationTokenSource.Token, queue, adminQueue, adminEmailRepo).Wait();
            }
            catch { }
            finally
            {
                this.runCompleteEvent.Set();
            }
        }

        public override bool OnStart()
        {
            // Set the maximum number of concurrent connections
            ServicePointManager.DefaultConnectionLimit = 12;

            // For information on handling configuration changes
            // see the MSDN topic at https://go.microsoft.com/fwlink/?LinkId=166357.
            StartHealthServer();

            bool result = base.OnStart();

            AzureTableStorageCloudAccount account = new AzureTableStorageCloudAccount();

            Trace.TraceInformation("NotificationService has been started");

            return result;
        }

        public override void OnStop()
        {
            Trace.TraceInformation("NotificationService is stopping");

            this.cancellationTokenSource.Cancel();
            this.runCompleteEvent.WaitOne();

            base.OnStop();

            Trace.TraceInformation("NotificationService has stopped");
        }

        private async Task RunAsync(CancellationToken cancellationToken, CloudQueue queue, CloudQueue adminQueue, AlertEmailRepository adminEmailRepo)
        {
            // TODO: Replace the following with your own logic.
            while (!cancellationToken.IsCancellationRequested)
            {
                // Trace.TraceInformation("Working");
                string adminMessage = NotificationQueue.DequeueComment(adminQueue);
                string commentId = NotificationQueue.DequeueComment(queue);
                if (commentId == null && adminMessage == null)
                {
                    await Task.Delay(1000);
                    continue;
                }
                if (commentId != null)
                {
                    // Send notifications to email
                    List<string> emails = await CommentService.GetPostEmails(commentId);
                    string commentText = (await ReadComment.Run(AzureTableStorageCloudAccount.GetCloudTable("comments"), commentId)).Content;
                    int numOfEmailsSent = 0;
                    foreach (string email in emails)
                    {
                        if (await CommentService.SendEmail(email, commentText))
                        {
                            ++numOfEmailsSent;
                        }
                    }
                    // Save date and time and number of emails sent
                    if (!(await InsertEmailLog.Execute(AzureTableStorageCloudAccount.GetCloudTable("emailLogs"), new EmailLog(DateTime.Now, commentId, numOfEmailsSent))))
                    {
                        Trace.TraceError("Error inserting email log into table.");
                    }
                }
                if (adminMessage != null)
                {
                    List<AlertEmailDTO> alertEmailDTOs = adminEmailRepo.ReadAll().Select(alertEmail => new AlertEmailDTO(alertEmail.RowKey, alertEmail.Email)).ToList();
                    if (alertEmailDTOs.Count == 0)
                    {
                        continue;
                    }
                    foreach (AlertEmailDTO dto in alertEmailDTOs)
                    {
                        await CommentService.SendEmail(dto.Email, adminMessage); // No need to await the operation as it will only slow down the sending process, and we are not required to check the result of sending this email
                    }
                }
            }
        }


        private void StartHealthServer()
        {
            try
            {
                // isto ko kod healthmonitora
                string roleId = RoleEnvironment.CurrentRoleInstance.Id;
                int startIndex = roleId.LastIndexOf("_IN_") + 4;
                int endIndex = roleId.Length;
                string instanceIndexStr = roleId.Substring(startIndex, endIndex - startIndex);

                int instanceIndex = int.Parse(instanceIndexStr);
                int port = 6002 + instanceIndex;
                new HealthServer(port);
                Trace.TraceInformation($"HealthMonitor server for NotificationService {instanceIndex + 1} is running on port {port}");
            }
            catch (Exception e)
            {
                Trace.TraceWarning("Error starting WCF service!" + e.Message);
            }
        }
    }
}
