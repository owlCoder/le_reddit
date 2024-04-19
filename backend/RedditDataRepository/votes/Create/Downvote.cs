using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.classes.Votes;
using RedditDataRepository.votes.Read;
using System.Threading.Tasks;

namespace RedditDataRepository.votes.Create
{
    public class Downvote
    {
        public static async Task<bool> Execute(CloudTable table, Vote vote)
        {
            if (vote == null || table == null)
                return false;

            try
            {
                Vote v = await VoteExists.DoesVoteExist(table, vote.PostId, vote.Email);

                if (v == null || v.Voted)
                {
                    // Create a TableOperation object to insert or replace the entity
                    TableOperation insertOrReplaceOperation = TableOperation.InsertOrReplace(vote);

                    // Execute the operation asynchronously
                    TableResult result = await table.ExecuteAsync(insertOrReplaceOperation);

                    // Check if the operation was successful
                    return result.HttpStatusCode == 200 || result.HttpStatusCode == 204;
                }
                else
                {
                    TableOperation delete = TableOperation.Delete(vote);

                    TableResult result = await table.ExecuteAsync(delete);

                    return result.HttpStatusCode == 200 || result.HttpStatusCode == 204;
                }
            }
            catch
            {
                // An error occurred during insertion
                return false;
            }
        }
    }
}
