using Common.cloud.account;
using RedditDataRepository.blobs.images;
using RedditDataRepository.classes.Posts;
using RedditDataRepository.posts.Create;
using System.IO;
using System.Net.Http;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System;
using System.Web.Http;
using RedditServiceWorker.Models.comment;
using RedditDataRepository.comments.Create;
using RedditDataRepository.classes.Comments;
using System.Collections.Generic;
using RedditDataRepository.comments.Read;
using RedditDataRepository.Comments.Read;
using Common.auth.guard;
using System.Web.Helpers;
using RedditDataRepository.comments.Delete;

namespace RedditServiceWorker.Controllers
{
    [RoutePrefix("api/comment")]
    public class CommentController : ApiController
    {
        #region CREATE
        [Route("create")]
        [HttpPost]
        [JwtAuthenticationFilter] // Requires JWT authentication
        public async Task<IHttpActionResult> Create(CreateComment _comment)
        {
            try
            {
                Comment comment = new Comment(_comment.Author, _comment.PostId, _comment.Content);
                
                // Put post into table
                bool insert_result = await InsertComment.Execute(AzureTableStorageCloudAccount.GetCloudTable("comments"), comment);

                if (insert_result)
                {
                    // Comment was successfully added to the table
                    return Ok(); // Return 200 OK
                }
                else
                {

                    return BadRequest("Comment creation failed"); // Return 400 Bad Request with an error message
                }
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }
        #endregion

        #region DELETE
        [HttpDelete]
        [Route("{commentId}")]
        [JwtAuthenticationFilter] // Requires JWT authentication
        public async Task<IHttpActionResult> Delete(string commentId)
        {
            try
            {
                // Retrieve the comment author by ID
                string author = await ReadCommentAuthor.Execute(AzureTableStorageCloudAccount.GetCloudTable("comments"), commentId);

                // Only author of comment can delete it
                if (!ResourceGuard.RunCheck(ActionContext, author))
                {
                    // Return unauthorized if the request is not authorized
                    return Unauthorized();
                }

                bool delete_result = await DeleteComment.Execute(AzureTableStorageCloudAccount.GetCloudTable("comments"), commentId);

                if(delete_result)
                {
                    return Ok();
                }
                else
                {
                    return BadRequest();
                }
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        #endregion
    }
}