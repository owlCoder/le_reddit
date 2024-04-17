using Common.cloud.account;
using RedditDataRepository.votes;
using System;
using System.Collections.Generic;
using System.Linq;
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

        [HttpPost]
        [Route("upvote/{postId}/{userId}")]
        public async Task<IHttpActionResult> UpvotePost(string postId, string userId)
        {

        }

        [HttpPost]
        [Route("downvote/{postId}/{userId}")]
        public async Task<IHttpActionResult> DownvotePost(string postId, string userId)
        {

        }
    }
}