using Common.auth;
using Common.cloud.account;
using Common.config;
using RedditDataRepository.blobs.images;
using RedditDataRepository.Classes.Users;
using RedditDataRepository.users.Create;
using RedditDataRepository.users.Read;
using RedditServiceWorker.Models.auth.login;
using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace RedditServiceWorker.Controllers
{
    // Define route prefix for the controller
    [RoutePrefix("api/auth")]
    public class AuthController : ApiController
    {
        #region JWT
        // Create a JWT instance
        private static readonly JWT _jwtTokenGenerator = new JWT(JWTKeyStorage.SecretKey, "RCA", "students");
        #endregion

        #region LOGIN
        /// <summary>
        /// Authenticates a user and generates a JWT token.
        /// </summary>
        [Route("login")]
        [HttpPost]
        public async Task<IHttpActionResult> Authenticate(Login user)
        {
            // Check if any data is entered
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            // If user exists, generate token
            if (await CheckUserCredentials.RunCheck(AzureTableStorageCloudAccount.GetCloudTable("Users"), user.Email, user.Password))
                return Ok(new { token = _jwtTokenGenerator.GenerateToken(user.Email) });
            else
                return Unauthorized();
        }
        #endregion

        #region SIGN UP
        /// <summary>
        /// Signs up a new user.
        /// </summary>
        [HttpPost]
        [Route("signup")]
        public async Task<IHttpActionResult> SignUp()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                return StatusCode(HttpStatusCode.UnsupportedMediaType);
            }

            if (Directory.Exists("~/App_Data"))
            {
                Directory.CreateDirectory("~/App_Data");
            }

            // Store form data locally
            var provider = new MultipartFormDataStreamProvider(HttpContext.Current.Server.MapPath("~/App_Data"));

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                // Access form data and put into user object
                User user = new User(provider);

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
                if (!success)
                {
                    return BadRequest();
                }
                else
                {
                    // Save blob url to user 
                    user.ImageBlobUrl = blobUrl;

                    // Put user into table
                    bool insert_result = await InsertUser.Execute(AzureTableStorageCloudAccount.GetCloudTable("users"), user);

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
            finally
            {
                // Delete the saved file from the App_Data directory
                foreach (var fileData in provider.FileData)
                {
                    var localFilePath = fileData.LocalFileName;
                    File.Delete(localFilePath);
                }
            }
        }
        #endregion
    }
}
