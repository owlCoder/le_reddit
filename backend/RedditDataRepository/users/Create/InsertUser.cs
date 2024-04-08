using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.classes.UserDTO;
using RedditDataRepository.users.Read;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedditDataRepository.users.Create
{
    public class InsertUser
    {
        public static bool Add(CloudTable table, RegisteredUser user)
        {
            if(user == null || table == null) 
                return false;

            if(IsUserExists.RunCheck(table, user.Email))
                return false;

            // Create a TableOperation object to insert or replace the entity
            TableOperation insertOrReplaceOperation = TableOperation.InsertOrReplace(user);

            // Execute the operation
            TableResult result = table.Execute(insertOrReplaceOperation);

            // Check if the operation was successful
            return result.HttpStatusCode == 200 || result.HttpStatusCode == 204;
        }
    }
}
