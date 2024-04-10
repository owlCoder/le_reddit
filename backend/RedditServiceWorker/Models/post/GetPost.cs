using RedditDataRepository.classes.Comments;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace RedditServiceWorker.Models.post
{
    public class GetPost
    {
        public string Id { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public string Content { get; set; }
        public bool HasImage { get; set; }
        public string ImageBlobUrl { get; set; }
        public List<Comment> Comments { get; set; } = new List<Comment>();

        public GetPost() { }

        public GetPost(string id, string author, string title, string content, bool hasImage, string imageBlobUrl, List<Comment> comments)
        {
            Id = id;
            Author = author;
            Title = title;
            Content = content;
            HasImage = hasImage;
            ImageBlobUrl = imageBlobUrl;
            Comments = comments;
        }
    }
}