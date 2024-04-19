using Common.cloud.account;
using RedditDataRepository.classes.Votes;
using RedditDataRepository.votes;
using RedditDataRepository.votes.Create;
using RedditDataRepository.votes.Read;
using System;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace RedditServiceWorker.Controllers
{
    [RoutePrefix("api/vote")]
    public class VoteController : ApiController
    {
        [HttpGet]
        [Route("countVotes/{postId}")]
        public async Task<IHttpActionResult> CountVotesOnPost(string postId)
        {
            try
            {
                var result = await VotesCount.Execute(AzureTableStorageCloudAccount.GetCloudTable("votes"), postId);

                int karma = 0;
                foreach(var r in result)
                {
                    if (r.Voted)
                    {
                        ++karma;
                    }
                    else
                    {
                        --karma;
                    }
                }

                return Ok(karma);
            }
            catch (Exception e)
            {
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("upvote/{postId}/{encodedEmail}")]
        [JwtAuthenticationFilter]
        public async Task<IHttpActionResult> UpvotePost(string postId, string encodedEmail)
        {
            try
            {
                string email = HttpUtility.UrlDecode(encodedEmail);

                // Create a new Vote object
                Vote vote = new Vote(email, postId, true);

                // Insert the comment into the Azure table
                bool insert_result = await Upvote.Execute(AzureTableStorageCloudAccount.GetCloudTable("votes"), vote);

                if (insert_result)
                {
                    // Comment was successfully added to the table
                    return Ok(); // Return 200 OK
                }
                else
                {
                    // Return 400 Bad Request with an error message
                    return BadRequest("Vote failed");
                }
            }
            catch (Exception e)
            {
                // Return 500 Internal Server Error with the exception details
                return InternalServerError(e);
            }
        }

        [HttpGet]
        [Route("downvote/{postId}/{encodedEmail}")]
        [JwtAuthenticationFilter]
        public async Task<IHttpActionResult> DownvotePost(string postId, string encodedEmail)
        {
            try
            {
                string email = HttpUtility.UrlDecode(encodedEmail);

                // Create a new Vote object
                Vote vote = new Vote(email, postId, false);

                // Insert the comment into the Azure table
                bool insert_result = await Downvote.Execute(AzureTableStorageCloudAccount.GetCloudTable("votes"), vote);

                if (insert_result)
                {
                    // Comment was successfully added to the table
                    return Ok(); // Return 200 OK
                }
                else
                {
                    // Return 400 Bad Request with an error message
                    return BadRequest("Vote failed");
                }
            }
            catch (Exception e)
            {
                // Return 500 Internal Server Error with the exception details
                return InternalServerError(e);
            }
        }
    }
}