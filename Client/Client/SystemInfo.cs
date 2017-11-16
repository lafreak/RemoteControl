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

        public static List<Process> ListProcesses()
        {
            var list = new List<Process>();

            System.Diagnostics.Process[] processes = System.Diagnostics.Process.GetProcesses();

            foreach (System.Diagnostics.Process process in processes)
            {
                string Name;
                int? Id, ThreadsCount;
                DateTime? StartTime;
                long? WorkingSet64;

                try { Name = process.ProcessName; } catch (Exception) { Name = "Unknown"; }
                try { Id = process.Id; } catch (Exception) { Id = null; }
                try { ThreadsCount = process.Threads.Count; } catch (Exception) { ThreadsCount = null; }
                try { StartTime = process.StartTime; } catch (Exception) { StartTime = null; }
                try { WorkingSet64 = process.WorkingSet64; } catch (Exception) { WorkingSet64 = null; }

                list.Add(new Process()
                {
                    Name = Name,
                    Id = Id,
                    ThreadsCount = ThreadsCount,
                    StartTime = StartTime,
                    WorkingSet64 = WorkingSet64
                });
            }
            return list;
        }
    }
}
