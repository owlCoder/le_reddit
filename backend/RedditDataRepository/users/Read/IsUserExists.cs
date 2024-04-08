using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.classes.UserDTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace RedditDataRepository.users.Read
{
    public class IsUserExists
    {
        public static bool RunCheck(CloudTable table, string email)
        {
            // Create a TableOperation object to retrieve the entity
            TableOperation retrieveOperation = TableOperation.Retrieve<RegisteredUser>("User", email);

            // Execute the operation
            TableResult result = table.Execute(retrieveOperation);

            // Check if the entity exists
            return result.Result != null;
        }
    }
}
