using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    public sealed class SystemInfo
    {
        private static SystemInfo m_Instance = null;

        public Hardware Hardware = new Hardware();

        private SystemInfo() {}

        public static SystemInfo Instance
        {
            get
            {
                if (m_Instance == null)
                    m_Instance = new SystemInfo();
                return m_Instance;
            }
        }

        public string FindMac()
        {
            try
            {
                return NetworkInterface.GetAllNetworkInterfaces()
                    .Where(n => n.OperationalStatus == OperationalStatus.Up)
                    .Select(n => n.GetPhysicalAddress().ToString())
                    .FirstOrDefault();
            }
            catch (Exception)
            {
                return "";
            }
        }
    }
}
