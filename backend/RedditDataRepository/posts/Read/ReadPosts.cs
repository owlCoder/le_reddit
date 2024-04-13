using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.classes.Posts;
using System.Threading.Tasks;
using System.Collections.Generic;


namespace RedditDataRepository.posts.Read
{
    public class ReadPosts
    {
        public static async Task<List<Post>> Execute(CloudTable table, string postId)
        {
            TableQuery<Post> query;
            if (postId == null || postId.Equals(""))
            {
                query = new TableQuery<Post>().Where(TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Post")).Take(1);
            }
            else
            {
                query = new TableQuery<Post>().Where(TableQuery.CombineFilters(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Post"),
                TableOperators.And,
                TableQuery.GenerateFilterCondition("Id", QueryComparisons.GreaterThan, postId))
                ).Take(1);
            }
            
            var posts = new List<Post>();
            //TableContinuationToken continuationToken = null;

            //do
            //{
                var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);
                posts.AddRange(queryResult.Results);
            //    continuationToken = queryResult.ContinuationToken;
            //} while (continuationToken != null);

            return posts;
        }
    }
}
