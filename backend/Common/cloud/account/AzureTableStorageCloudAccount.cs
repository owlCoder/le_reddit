using Microsoft.Azure;
using Microsoft.WindowsAzure.Storage;
using Microsoft.WindowsAzure.Storage.Table;
using System;

namespace Common.cloud.account
{
    public class AzureTableStorageCloudAccount
    {
        private static CloudStorageAccount _storageAccount;
        private static CloudTableClient _tableClient;

        public AzureTableStorageCloudAccount()
        {
            _storageAccount = CloudStorageAccount.Parse(CloudConfigurationManager.GetSetting("DataConnectionString"));
            _tableClient = new CloudTableClient(new Uri(_storageAccount.TableEndpoint.AbsoluteUri), _storageAccount.Credentials);
        }

        public static CloudStorageAccount GetAccount()
        {
            return _storageAccount;
        }

        public static CloudTable GetCloudTable(string table_name)
        {
            var _table = _tableClient.GetTableReference(table_name);
            _table.CreateIfNotExists();

            return _table;
        }
    }
}
