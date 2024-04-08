using System.Threading.Tasks;
using System.Web.Http;

namespace RedditServiceWorker.Controllers
{
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        [Route("get/{id}")]
        [HttpGet]
        //[JwtAuthenticationFilter] // Apply the authentication filter
        public async Task<IHttpActionResult> GetUser()
        {
            // Get email from route data
            //var email = RequestContext.RouteData.Values["email"] as string;
            // dodaj da ako se mail iz tokena poklapa sa trazenim mejlom sve top
            // Use the email parameter in your logic
            // For example, you can retrieve user data based on the email
            return Ok(new { response = $"Hello,. This is protected data." });
        }
    }
}
