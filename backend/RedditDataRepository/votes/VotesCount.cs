using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.classes.Votes;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace RedditDataRepository.votes
{
    public class VotesCount
    {
        public static async Task<List<Vote>> Execute(CloudTable table, string postId)
        {
            var query = new TableQuery<Vote>().Where(TableQuery.CombineFilters(
                TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Vote"),
                TableOperators.And,
                TableQuery.GenerateFilterCondition("PostId", QueryComparisons.Equal, postId)));

            List<Vote> votes = new List<Vote>();
            var queryResult = await table.ExecuteQuerySegmentedAsync(query, null);
            votes.AddRange(queryResult.Results);


            return votes;
        }
    }
}
