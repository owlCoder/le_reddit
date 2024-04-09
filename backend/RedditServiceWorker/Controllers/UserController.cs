using Common.auth.guard;
using Common.cloud.account;
using RedditDataRepository.Classes.Users;
using RedditDataRepository.users.Read;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Runtime.Remoting.Messaging;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Controllers;

namespace RedditServiceWorker.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        [Route("{email}")]
        [HttpGet]
        [JwtAuthenticationFilter] // Apply the authentication filter
        public async Task<IHttpActionResult> GetUser(string email)
        {
            if(ResourceGuard.RunCheck(ActionContext, email))
            {
                User user = await ReadUser.Run(AzureTableStorageCloudAccount.GetCloudTable("users"), "User", email);

                if (user != null)
                    return Ok(user);
                else
                    return NotFound();
            }
            else
            {
                return Unauthorized();
            }
            
        }
    }
}
