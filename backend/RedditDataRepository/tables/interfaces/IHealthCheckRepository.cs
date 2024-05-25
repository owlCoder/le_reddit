using RedditDataRepository.tables.entities;
using System;
using System.Linq;
using System.ServiceModel;

namespace RedditDataRepository.tables.interfaces
{
    [ServiceContract]
    public interface IHealthCheckRepository
    {
        [OperationContract]
        bool Create(HealthCheck healthCheck);

        [OperationContract]
        HealthCheck Read(string dateTime);

        [OperationContract]
        IQueryable<HealthCheck> ReadAll();

        [OperationContract]
        bool Update(string dateTime, HealthCheck healthCheck);

        [OperationContract]
        bool Delete(string dateTime);

        [OperationContract]
        int GetCheckCount(DateTimeOffset startDate, DateTimeOffset endDate);

        [OperationContract]
        int GetOkCheckCount(DateTimeOffset startDate, DateTimeOffset endDate);
    }
}
