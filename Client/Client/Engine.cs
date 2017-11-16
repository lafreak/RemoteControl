using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    public class Engine
    {
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

        public static void KillProcess(int id)
        {
            System.Diagnostics.Process process = System.Diagnostics.Process.GetProcessById(id);
            process.Kill();
        }
    }
}
