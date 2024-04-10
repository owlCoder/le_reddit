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

        #region GET
        // TODO get all comments by post id
        #endregion

        #region DELETE
        // TODO delete one comment by comment id
        #endregion
    }
}