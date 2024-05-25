using System.ServiceModel;

namespace Common
{
    [ServiceContract]
    public interface IHealthMonitoring
    {
        [OperationContract]
        void IAmAlive();
    }
}
