using Microsoft.WindowsAzure.Storage.Table;
using System;
using System.Net.Http;

namespace RedditDataRepository.classes.Votes
{
    public class Vote : TableEntity
    {
        public string Id { get; set; }


    }
}
