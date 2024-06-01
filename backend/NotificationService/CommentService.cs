using Common.cloud.account;
using RedditDataRepository.classes.Comments;
using RedditDataRepository.classes.Posts;
using RedditDataRepository.comments.Read;
using RedditDataRepository.posts.Read;
using SendGrid;
using SendGrid.Helpers.Mail;
using System.Collections.Generic;
using System.Diagnostics;
using System.Net;
//using System.Text.Json;
//using System.Net.Http.Json;
using System.Threading.Tasks;

namespace NotificationService
{
    public class CommentService
    {
        public static async Task<List<string>> GetPostEmails(string commentId)
        {
            List<string> emails = new List<string>();
            string postId = await getPostId(commentId);
            if (postId == null) return emails;
            emails = await ReadSubscriptions.Run(AzureTableStorageCloudAccount.GetCloudTable("subscriptions"), postId);
            return emails;
        }
        private static async Task<string> getPostId(string commentId)
        {
            Comment comment = await ReadComment.Run(AzureTableStorageCloudAccount.GetCloudTable("comments"), commentId);
            if (comment == null) return null;
            Post post = await ReadPost.Run(AzureTableStorageCloudAccount.GetCloudTable("posts"), "Post", comment.PostId);
            if (post == null) return null;
            return post.Id;
        }

        public static async Task<bool> SendEmail(string email, string commentText)
        {
            Trace.TraceError("Trying to send email to " + email);
            ServicePointManager.Expect100Continue = true;
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            string api_key = "API_KEY";
            //string api_secret = "API_SECRET";
            var client = new SendGridClient(api_key);
            var fromEmail = new EmailAddress("prededb@gmail.com", "FTN Projekat"); //"LeReddit@lereddit.com", "LeReddit"
            var toEmail = new EmailAddress(email, email.Split('@')[0]);
            var text = commentText;
            var msg = MailHelper.CreateSingleEmail(fromEmail, toEmail, "You missed on LeReddit", text, text);
            var response = await client.SendEmailAsync(msg);
            return response.IsSuccessStatusCode;
        }
    }

}
