using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;

namespace RedditDataRepository.blobs.images
{
    /// <summary>
    /// Provides functionality to upload files to Azure Blob Storage.
    /// </summary>
    public class AzureBlobStorage
    {
        /// <summary>
        /// Uploads a file to Azure Blob Storage.
        /// </summary>
        /// <param name="localFilePath">The local file path of the file to be uploaded.</param>
        /// <param name="fileExtension">The file extension of the file to be uploaded.</param>
        /// <param name="containerName">The name of the Blob Storage container. Default is "images".</param>
        /// <returns>
        /// A tuple containing a boolean indicating the success of the upload operation
        /// and the URL of the uploaded blob. If the upload fails, the URL will be null.
        /// </returns>
        public static async Task<(bool success, string blobUrl)> UploadFileToBlobStorage(string localFilePath, string fileExtension, string containerName = "images")
        {
            try
            {
                var storageConnectionString = CloudConfigurationManager.GetSetting("DataConnectionString");

                var storageAccount = CloudStorageAccount.Parse(storageConnectionString);
                var blobClient = storageAccount.CreateCloudBlobClient();
                var container = blobClient.GetContainerReference(containerName);
                await container.CreateIfNotExistsAsync();

                var fileName = Guid.NewGuid().ToString() + fileExtension;
                var blob = container.GetBlockBlobReference(fileName);

                using (var fileStream = File.OpenRead(localFilePath))
                {
                    await blob.UploadFromStreamAsync(fileStream);
                }

                var blobUrl = blob.Uri.ToString();
                return (true, blobUrl); // Upload successful, return blob URL
            }
            catch (Exception)
            {
                return (false, null); // Upload failed, return null URL
            }
        }
    }
}
