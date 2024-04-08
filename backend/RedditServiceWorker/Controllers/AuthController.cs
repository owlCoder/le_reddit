using Common.auth;
using Common.config;
using RedditServiceWorker.Models.auth.login;
using RedditServiceWorker.Models.auth.sign_up;
using System;
using System.Net.Http;
using System.Net;
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

        [Route("login")]
        [HttpPost]
        public IHttpActionResult Authenticate(Login user)
        {
            // Check if any data is entered
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // If user exists, generate token
            if (IsValidUser(user.Email, user.Password))
                return Ok(new { token = _jwtTokenGenerator.GenerateToken(user.Email) });
            else
                return Unauthorized();
        }

        [Route("signup")]
        [HttpPost]
        public IHttpActionResult SignUp(User user)
        {
            // Check if any data is entered
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // If user exists, return error, email exist
            if (IsEmailAlreadyRegistered(user.Email))
                return ResponseMessage(new HttpResponseMessage(HttpStatusCode.Conflict)
                {
                    Content = new StringContent("Email address is already registered")
                });

                //return Ok(new { Token = _jwtTokenGenerator.GenerateToken(user.Email) });
            else
            {
                // TODO pozovi metodu da doda korisnika
                // ako postoji slika
                
                return Unauthorized();
            }
        }

        private bool IsEmailAlreadyRegistered(string email)
        {
            throw new NotImplementedException();
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
