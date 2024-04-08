using Microsoft.WindowsAzure.Storage.Table;
using System.Net.Http;

namespace RedditDataRepository.classes.UserDTO
{
    public class RegisteredUser : TableEntity
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string Country { get; set; }
        public string Phone { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string ImageBlobUrl { get; set; }

        public RegisteredUser(MultipartFormDataStreamProvider provider)
        {
            PartitionKey = "User";
            RowKey = provider.FormData["email"];

            FirstName = provider.FormData["firstName"];
            LastName = provider.FormData["lastName"];
            Address = provider.FormData["address"];
            City = provider.FormData["city"];
            Country = provider.FormData["country"];
            Phone = provider.FormData["phone"];
            Email = provider.FormData["email"];
            Password = provider.FormData["password"];
        }
    }
}
