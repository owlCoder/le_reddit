using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.classes.Votes;
using System.Linq;
using System.Threading.Tasks;

namespace RedditDataRepository.votes
{
    public class VoteExists
    {
        public static async Task<Vote> DoesVoteExist(CloudTable table, string postId, string userId)
        {
            string partitionFilter = TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, "Vote");
            string postIdFilter = TableQuery.GenerateFilterCondition("PostId", QueryComparisons.Equal, postId);
            string userIdFilter = TableQuery.GenerateFilterCondition("UserId", QueryComparisons.Equal, userId);

            string combinedFilter = TableQuery.CombineFilters(partitionFilter, TableOperators.And, postIdFilter);
            combinedFilter = TableQuery.CombineFilters(combinedFilter, TableOperators.And, userIdFilter);

            var query = new TableQuery<Vote>().Where(combinedFilter);

            var result = await table.ExecuteQuerySegmentedAsync(query, null);

            return result.FirstOrDefault();
        }
    }
}
