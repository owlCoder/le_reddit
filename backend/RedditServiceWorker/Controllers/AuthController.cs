using Common.auth;
using Common.config;
using RedditServiceWorker.Models.auth.login;
using System.Security.Claims;
using System.Web.Http;

namespace RedditServiceWorker.Controllers
{
    // Define route prefix for the controller
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        // Create a JWT instance
        private static readonly JWT _jwtTokenGenerator = new JWT(JWTKeyStorage.SecretKey, "RCA", "students");

        [Route("login")] // Define route for the login action
        [HttpPost]
        public IHttpActionResult Authenticate(Login model)
        {
            // Check if any data is entered
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // If user exists, generate token
            if (IsValidUser(model.Email, model.Password))
                return Ok(new { Token = _jwtTokenGenerator.GenerateToken(model.Email) });
            else
                return Unauthorized();
        }

        private bool IsValidUser(string email, string password)
        {
            // Your authentication logic here
            // Example: Check if email and password match in the database
            return email == "danijel.xda@gmail.com" && password == "123456";
        }

        [HttpGet]
        [Route("protected")]
        [JwtAuthenticationFilter] // Apply the authentication filter here
        public IHttpActionResult GetData()
        {
            // Access authenticated user information
            var user = User as ClaimsPrincipal;
            var username = user.Identity.Name;

            // Return protected data
            return Ok(new { resposne = $"Hello, {username}. This is protected data." });
        }
    }
}
