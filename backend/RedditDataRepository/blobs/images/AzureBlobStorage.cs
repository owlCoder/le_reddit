using Common.cloud.account;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

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
                var storageAccount = AzureTableStorageCloudAccount.GetAccount();
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

        public static async Task<bool> RemoveFileFromBlobStorage(string imageBlobUrl)
        {
            try
            {
                var storageAccount = AzureTableStorageCloudAccount.GetAccount();

                // Create the blob client
                CloudBlobClient blobClient = storageAccount.CreateCloudBlobClient();

                // Parse the blob URL
                if (Uri.TryCreate(imageBlobUrl, UriKind.Absolute, out Uri blobUri))
                {
                    // Create a blob container reference
                    string containerName = "images";
                    CloudBlobContainer container = blobClient.GetContainerReference(containerName);

                    // Get the blob name from the URL
                    string blobName = blobUri.Segments.Last();

                    // Get a reference to the blob
                    CloudBlockBlob blob = container.GetBlockBlobReference(blobName);

                    // Delete the blob
                    await blob.DeleteIfExistsAsync();

                    // Blob deleted successfully
                    return true;
                }
                else
                {
                    // Invalid imageBlobUrl
                    return false;
                }
            }
            catch (Exception)
            {
                // An error occurred while deleting the blob
                return false;

            }
        }
    }
}
