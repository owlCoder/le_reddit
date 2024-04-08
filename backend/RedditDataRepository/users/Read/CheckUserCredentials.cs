using Microsoft.WindowsAzure.Storage.Table;
using RedditDataRepository.classes.UserDTO;

namespace RedditDataRepository.users.Read
{
    public class CheckUserCredentials
    {
        public static bool RunCheck(CloudTable table, string email, string password)
        {
            // Create a TableOperation object to retrieve the entity
            TableOperation retrieveOperation = TableOperation.Retrieve<RegisteredUser>("User", email);

            // Execute the operation
            TableResult result = table.Execute(retrieveOperation);

            // Check if the entity exists
            if (result.Result != null)
            {
                // If the user exists, check if the provided password matches
                RegisteredUser user = (RegisteredUser)result.Result;
                return user.Password == password;
            }
            else
            {
                // If the user does not exist, return false
                return false;
            }
        }
    }
}
