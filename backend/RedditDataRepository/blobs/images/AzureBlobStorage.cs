using Common.cloud.account;
using Microsoft.WindowsAzure.Storage.Blob;
using System;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace RedditDataRepository.blobs.images
{
    /// <summary>
    /// Provides functionality to upload and remove files from Azure Blob Storage.
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

                // Set container access level to allow public access
                var permissions = new BlobContainerPermissions
                {
                    PublicAccess = BlobContainerPublicAccessType.Container
                };
                await container.SetPermissionsAsync(permissions);

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

        /// <summary>
        /// Removes a file from Azure Blob Storage.
        /// </summary>
        /// <param name="imageBlobUrl">The URL of the blob to be removed.</param>
        /// <returns>A boolean indicating whether the removal was successful.</returns>
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
