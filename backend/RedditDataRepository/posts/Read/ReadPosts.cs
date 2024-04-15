using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.classes.Posts;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;

namespace RedditDataRepository.posts.Read
{
    public class ReadPosts
    {
        public static async Task<List<Post>> Execute(CloudTable table, string postId, int remaining, string searchKeywords)
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

            List<Post> allPosts = new List<Post>();
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);
            allPosts.AddRange(queryResult.Results);

            if (!searchKeywords.Contains('~'))
            {
                List<Post> posts = new List<Post>();
                string[] searchTerms = searchKeywords.ToLower().Split(' ');
                foreach(Post p in allPosts)
                {
                    foreach(string s in searchTerms)
                    {
                        string title = Regex.Replace(p.Title.ToLower(), @"\s+", "");
                        if (title.Contains(s))
                        {
                            posts.Add(p);
                        }
                    }
                }

                return posts.OrderByDescending(post => post.Timestamp).Take(remaining).ToList();
            }

            return allPosts.OrderByDescending(allPost => allPost.Timestamp).Take(remaining).ToList();
        }
    }
}
