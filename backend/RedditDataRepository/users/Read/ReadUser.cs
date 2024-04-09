using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.Classes.Users;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedditDataRepository.users.Read
{
    public class ReadUser
    {
        public static async Task<User> Run(CloudTable table, string partitionKey, string email)
        {
            if (table == null)
                return null;

            var query = new TableQuery<User>().Where(
                TableQuery.CombineFilters(
                    TableQuery.GenerateFilterCondition("PartitionKey", QueryComparisons.Equal, partitionKey),
                    TableOperators.And,
                    TableQuery.GenerateFilterCondition("Email", QueryComparisons.Equal, email)));

            TableContinuationToken continuationToken = null;
            do
            {
                var segment = await table.ExecuteQuerySegmentedAsync(query, continuationToken);
                continuationToken = segment.ContinuationToken;

                foreach (var entity in segment.Results)
                {
                    if (entity.Email == email)
                    {
                        return entity;
                    }
                }
            } while (continuationToken != null);

            return null; // No matching student found
        }
    }
}
