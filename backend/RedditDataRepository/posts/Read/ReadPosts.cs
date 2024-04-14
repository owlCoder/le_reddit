using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.classes.Posts;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;


namespace RedditDataRepository.posts.Read
{
    public class ReadPosts
    {
        public static async Task<List<Post>> Execute(CloudTable table, string postId, int remaining)
        {
            TableQuery<Post> query;
            if (postId.Equals("0"))
            {
                query = new TableQuery<Post>().Where(TableQuery.GenerateFilterCondition
                ("PartitionKey", QueryComparisons.Equal, "Post"));
            }
            else
            {
                query = new TableQuery<Post>().Where(TableQuery.CombineFilters(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Post"),
                TableOperators.And,
                TableQuery.GenerateFilterCondition("Id", QueryComparisons.LessThan, postId))
                );
            }
            
            var posts = new List<Post>();
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);
            posts.AddRange(queryResult.Results);

            return posts.OrderByDescending(post => post.Timestamp).Take(remaining).ToList();
        }
    }
}
