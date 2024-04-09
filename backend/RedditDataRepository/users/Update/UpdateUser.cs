using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.Classes.Users;
using RedditDataRepository.users.Read;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedditDataRepository.users.Update
{
    public class UpdateUser
    {
        public static async Task<bool> Execute(CloudTable table, User user)
        {
            // Check if user or table is null
            if (user == null || table == null)
                return false;

            // Check if user doesn't exist
            if (!await IsUserExists.RunCheckAsync(table, user.Email))
                return false;

            try
            {
                // Create a TableOperation object to insert or replace the entity
                TableOperation insertOrReplaceOperation = TableOperation.InsertOrReplace(user);

                // Execute the operation asynchronously
                TableResult result = await table.ExecuteAsync(insertOrReplaceOperation);

                // Check if the operation was successful
                return result.HttpStatusCode == 200 || result.HttpStatusCode == 204;
            }
            catch
            {
                // An error occurred during insertion
                return false;
            }
        }
    }
}
