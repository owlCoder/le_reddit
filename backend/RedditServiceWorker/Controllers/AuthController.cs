using Common.auth;
using Common.config;
using RedditServiceWorker.Models.auth.login;
using RedditServiceWorker.Models.auth.sign_up;
using System;
using System.Net.Http;
using System.Net;
using System.Security.Claims;
using System.Web.Http;
using System.Web;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage;
using System.IO;
using Microsoft.Azure;

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

        [HttpPost]
        [Route("signup")]
        public async Task<IHttpActionResult> SignUp()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return StatusCode(HttpStatusCode.UnsupportedMediaType);
            }

            var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath("~/App_Data"));

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                // Access form data
                var firstName = provider.FormData["firstName"];
                var lastName = provider.FormData["lastName"];
                var address = provider.FormData["address"];
                var city = provider.FormData["city"];
                var country = provider.FormData["country"];
                var phone = provider.FormData["phone"];
                var email = provider.FormData["email"];
                var password = provider.FormData["password"];

                // Access file
                var file = provider.FileData[0]; // Assuming only one file is uploaded

                // Process user data here

                // Upload file to Azure Blob Storage
                var storageConnectionString = CloudConfigurationManager.GetSetting("DataConnectionString"); // Your Azure Storage connection string
                var containerName = "images"; // Your Blob Storage container name

                var storageAccount = CloudStorageAccount.Parse(storageConnectionString);
                var blobClient = storageAccount.CreateCloudBlobClient();
                var container = blobClient.GetContainerReference(containerName);
                await container.CreateIfNotExistsAsync();

                var fileName = Guid.NewGuid().ToString(); // You can generate a unique filename here
                var blob = container.GetBlockBlobReference(fileName);
                using (var fileStream = File.OpenRead(file.LocalFileName))
                {
                    await blob.UploadFromStreamAsync(fileStream);
                }

                return Ok(); // Return appropriate response
            }
            catch (Exception e)
            {
                return InternalServerError(e);
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
