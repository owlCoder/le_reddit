using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Net.Http;

namespace RedditDataRepository.classes.Votes
{
    public class Vote : TableEntity
    {
        public string Id { get; set; }

        public string PostId { get; set; }

        public string Email { get; set; }

        public bool Voted { get; set; }

        public Vote() { }

        public Vote(string email, string postId, bool voted)
        {
            Id = Guid.NewGuid().ToString();
            PartitionKey = "Vote";
            RowKey = Id;
            Email = email;
            PostId = postId;
            Voted = voted;
        }
    }
}
