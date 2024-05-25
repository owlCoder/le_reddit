using Common;
using System;

namespace RedditServiceWorker
{
    public class HealthMonitoring : IHealthMonitoring
    {
        public void IAmAlive()
        {
            Console.WriteLine("ZIV SAM");
        }
    }
}