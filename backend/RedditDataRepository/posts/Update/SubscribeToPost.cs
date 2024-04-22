using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.classes.Posts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedditDataRepository.posts.Update
{
    public class SubscribeToPost
    {
        public static async Task<bool> Execute(CloudTable table, string postId, string email)
        {
            if (table == null)
            {
                return false;
            }
            try
            {
                TableOperation tableOperation = TableOperation.InsertOrReplace(new Subscription(postId, email));
                TableResult tableResult = await table.ExecuteAsync(tableOperation);

                return tableResult.HttpStatusCode == 200 || tableResult.HttpStatusCode == 204;
            }
            catch
            {
                return false;
            }
        }
    }
}
