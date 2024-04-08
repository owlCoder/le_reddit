using Common.auth;
using Common.config;
using Newtonsoft.Json;
using RedditServiceWorker.Models.auth.login;
using System.Web.Http;

namespace RedditServiceWorker.Controllers
{
    //[Route("api/auth/")]
    public class AuthController : ApiController
    {
        // Create a JWT instance
        public static readonly JWT _jwtTokenGenerator = new JWT(JWTKeyStorage.SecretKey, "MIRKO", "SELJOBERI");

        [Route("api/auth/login")]
        [HttpPost]
        public IHttpActionResult Authenticate(Login model)
        {
            // Authenticate user using email and password
            if (IsValidUser(model.Email, model.Password))
            {
                var token = _jwtTokenGenerator.GenerateToken(model.Email);
                return Ok(new { Token = token });
            }

            return Unauthorized();
        }

        private bool IsValidUser(string email, string password)
        {
            // Your authentication logic here
            // Example: Check if email and password match in the database
            return email == "danijel.xda@gmail.com" && password == "123456";
        }
    }
}