using Common.auth;
using Common.config;
using RedditServiceWorker.Models.auth.login;
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
using RedditDataRepository.blobs.images;
using RedditDataRepository.classes.UserDTO;
using RedditDataRepository.users.Create;
using Common.cloud.account;

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

            // Store form data locally
            var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath("~/App_Data"));

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                // Access form data and put into user object
                RegisteredUser user = new RegisteredUser(provider);

                // Access profile picture
                var file = provider.FileData[0]; // Only one file is uploaded
                var name = file.Headers.ContentDisposition.FileName;

                // Just get extension of file name
                name = name.Substring(1, name.Length - 2);
                var fileExtension = Path.GetExtension(name).ToLower(); // Get the file extension

                // Upload file to Azure Blob Storage
                (bool success, string blobUrl) = await AzureBlobStorage.UploadFileToBlobStorage(file.LocalFileName, fileExtension, "images");

                // If image uploaded get image url in blob storage
                // and put into user table
                if(success == false)
                {
                    return BadRequest();
                }
                else
                {
                    // Save blob url to user 
                    user.ImageBlobUrl = blobUrl;

                    // Put user into table
                    bool insert_result = InsertUser.Add(AzureTableStorageCloudAccount.GetCloudTable("users"), user);

                    if (insert_result)
                    {
                        // User was successfully added to the table
                        return Ok(); // Return 200 OK
                    }
                    else
                    {
                        // User was not successfully added to the table
                        // Delete the image associated with the user
                        await AzureBlobStorage.RemoveFileFromBlobStorage(user.ImageBlobUrl);

                        return BadRequest("User creation failed"); // Return 400 Bad Request with an error message
                    }

                }
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
