using Newtonsoft.Json;
using System.Web.Http;

namespace RedditServiceWorker.Controllers
{
    [Route("api/auth/")]
    public class AuthController : ApiController
    {
        [HttpGet]
        
        public IHttpActionResult Login()
        {
            // napravi posebnu klasu za jwt token i da se generise pa uradi i login i register
            return Ok(new {resposne = "okej"});
        }
    }
}