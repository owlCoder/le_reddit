using Common.auth.guard;
using Common.cloud.account;
using RedditDataRepository.Classes.Users;
using RedditDataRepository.users.Read;
using System.Threading.Tasks;
using System.Web.Http;

namespace RedditServiceWorker.Controllers
{
    /// <summary>
    /// Controller for managing user-related operations.
    /// </summary>
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        /// <summary>
        /// Retrieves a user by email.
        /// </summary>
        /// <param name="email">The email of the user to retrieve.</param>
        /// <returns>
        /// HTTP 200 OK with the user data if found,
        /// HTTP 404 Not Found if the user is not found,
        /// or HTTP 401 Unauthorized if the request is not authorized.
        /// </returns>
        [Route("{email}")]
        [HttpGet]
        [JwtAuthenticationFilter]
        public async Task<IHttpActionResult> GetUser(string email)
        {
            // Check if the request is authorized
            if (!ResourceGuard.RunCheck(ActionContext, email))
            {
                // Return unauthorized if the request is not authorized
                return Unauthorized();
            }

            // Retrieve the user from the data repository
            User user = await ReadUser.Run(AzureTableStorageCloudAccount.GetCloudTable("users"), "User", email);

            // Return the user data if found
            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                // Return 404 Not Found if the user is not found
                return NotFound();
            }
        }
    }
}
