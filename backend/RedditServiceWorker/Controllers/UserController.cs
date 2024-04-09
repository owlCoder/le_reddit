using Common.auth.guard;
using Common.cloud.account;
using RedditDataRepository.blobs.images;
using RedditDataRepository.Classes.Users;
using RedditDataRepository.users.Create;
using RedditDataRepository.users.Read;
using System.IO;
using System.Net.Http;
using System.Net;
using System;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace RedditServiceWorker.Controllers
{
    /// <summary>
    /// Controller for managing user-related operations.
    /// </summary>
    [RoutePrefix("api/user")]
    public class UserController : ApiController
    {
        #region GET
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
        public async Task<IHttpActionResult> Get(string email)
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
        #endregion

        #region UPDATE
        /// <summary>
        /// Updates user profile information.
        /// </summary>
        [HttpPost]
        [Route("update")]
        [JwtAuthenticationFilter]
        public async Task<IHttpActionResult> Update()
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
                User user = new User(provider);

                // Access profile picture
                var file = provider.FileData[0]; // Only one file is uploaded

                // if new image not provided file will be null
                if (file != null)
                {
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
                        bool insert_result = await InsertUser.Add(AzureTableStorageCloudAccount.GetCloudTable("users"), user);

                        if (insert_result)
                        {
                            // User was successfully added to the table
                            // Remove old image from blob storage
                            await AzureBlobStorage.RemoveFileFromBlobStorage(provider.FormData["imageBlobUrl"]);

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
                else
                {
                    // Put user into table
                    bool insert_result = await InsertUser.Add(AzureTableStorageCloudAccount.GetCloudTable("users"), user);

                    if (insert_result)
                    {
                        return Ok(); // Return 200 OK
                    }
                    else
                    {
                        return BadRequest("User information can't be update");
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
