using System.Collections.Generic;
using System.ServiceModel;

namespace Common
{
    [ServiceContract]
    public interface IAdminToolService
    {
        [OperationContract]
        bool AddEmail(AlertEmailDTO alertEmail);

        [OperationContract]
        List<AlertEmailDTO> ReadAllEmails();

        [OperationContract]
        bool RemoveEmail(string Id);
    }
}
