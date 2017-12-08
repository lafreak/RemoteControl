using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    public sealed class Engine
    {
        private static Engine m_Instance = null;

        private Engine() { }

        public static Engine Instance
        {
            get
            {
                if (m_Instance == null)
                    m_Instance = new Engine();
                return m_Instance;
            }
        }

        public List<Process> ListProcesses()
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

        public void KillProcess(int id)
        {
            System.Diagnostics.Process process = System.Diagnostics.Process.GetProcessById(id);
            process.Kill();
        }

        public List<DirectoryOrFile> ListDirectoryOrFile(string path)
        {
            var list = new List<DirectoryOrFile>();

            if (path == "PC")
            {
                // Add active drives
                foreach (var drive in DriveInfo.GetDrives().Where(d => d.IsReady))
                {
                    list.Add(new DirectoryOrFile(drive.Name));
                }
            }
            else
            {
                if (IsDrive(path))
                    path += "/";

                var directoryInfo = new DirectoryInfo(path);

                // Add children directories
                foreach (var directory in directoryInfo.GetDirectories())
                {
                    bool accessible = true;

                    try
                    {
                        directory.GetDirectories();
                    }
                    catch (UnauthorizedAccessException)
                    {
                        accessible = false;
                    }

                    list.Add(new DirectoryOrFile(directory.FullName.Replace("\\", "/"))
                    {
                        Accessible = accessible
                    });
                }

                // Add children files
                foreach (var file in directoryInfo.GetFiles())
                {
                    list.Add(new DirectoryOrFile(file.FullName.Replace("\\", "/"))
                    {
                        type = DirectoryOrFile.TYPE.FILE, 
                        Size = file.Length
                    });
                }
            }

            return list;
        }

        private bool IsDrive(string path)
        {
            return path != null && path.Length == 2 && path[1] == ':';
        }

    }
}
