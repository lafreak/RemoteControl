using System;
using System.Collections.Generic;
using System.Linq;
using System.Management;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    public class Hardware
    {
        public string HDDSerialNo;
        public string BoardMaker;
        public string BoardID;
        public string CdRoom;
        public string BIOSMaker;
        public string BIOSSerialNo;
        public string BIOSCaption;
        public string Memory;
        public string RamSlots;
        public string CPUManufacturer;
        public double? CPUSpeed;
        public string Language;
        public string OSInfo;
        public string ProccesorInfo;

        public Hardware()
        {
            HDDSerialNo = GetHDDSerialNo();
            BoardMaker = GetBoardMaker();
            BoardID = GetBoardProductId();
            CdRoom = GetCdRomDrive();
            BIOSMaker = GetBIOSmaker();
            BIOSSerialNo = GetBIOSserNo();
            BIOSCaption = GetBIOScaption();
            Memory = GetPhysicalMemory();
            RamSlots = GetNoRamSlots();
            CPUManufacturer = GetCPUManufacturer();
            CPUSpeed = null;
            Language = GetCurrentLanguage();
            OSInfo = GetOSInformation();
            ProccesorInfo = GetProcessorInformation();
        }

        public override string ToString()
        {
            return "HDDSerialNO : " + HDDSerialNo + "\n" +
                   "BoardMaker : " + BoardMaker + "\n" +
                   "BoardID : " + BoardID + "\n" +
                   "CdRoom : " + CdRoom + "\n" +
                   "BIOSMaker : " + BIOSMaker + "\n" +
                   "BIOSSerialNO : " + BIOSSerialNo + "\n" +
                   "BIOSCaption : " + BIOSCaption + "\n" +
                   "Memory : " + Memory + "\n" +
                   "RamSlots : " + RamSlots + "\n" +
                   "CPUManufacturer : " + CPUManufacturer + "\n" +
                   "CPUSpeed : " + CPUSpeed + "\n" +
                   "Language : " + Language + "\n" +
                   "OSInfo : " + OSInfo + "\n" +
                   "ProcessorInfo : " + ProccesorInfo;
        }

        public static double? LoadCpuSpeedInGHz()
        {
            double? GHz = null;
            using (ManagementClass mc = new ManagementClass("Win32_Processor"))
            {
                foreach (ManagementObject mo in mc.GetInstances())
                {
                    GHz = 0.001 * (UInt32)mo.Properties["CurrentClockSpeed"].Value;
                    break;
                }
            }
            return GHz;
        }

        private static string GetBoardMaker()
        {
            ManagementObjectSearcher searcher = new ManagementObjectSearcher("root\\CIMV2", "SELECT * FROM Win32_BaseBoard");

            foreach (ManagementObject wmi in searcher.Get())
            {
                try
                {
                    return wmi.GetPropertyValue("Manufacturer").ToString();
                }

                catch (Exception)
                {
                    return "Unknown";
                }
            }
            return "Unknown";
        }

        private static String GetHDDSerialNo()
        {
            ManagementClass mangnmt = new ManagementClass("Win32_LogicalDisk");
            ManagementObjectCollection mcol = mangnmt.GetInstances();
            string result = "";

            foreach (ManagementObject strt in mcol)
            {
                result += Convert.ToString(strt["VolumeSerialNumber"]);
            }
            return result;
        }

        private static string GetBoardProductId()
        {
            ManagementObjectSearcher searcher = new ManagementObjectSearcher("root\\CIMV2", "SELECT * FROM Win32_BaseBoard");

            foreach (ManagementObject wmi in searcher.Get())
            {
                try
                {
                    return wmi.GetPropertyValue("Product").ToString();
                }

                catch (Exception)
                {
                    return "Unknown";
                }
            }
            return "Unknown";
        }

        private static string GetCdRomDrive()
        {
            ManagementObjectSearcher searcher = new ManagementObjectSearcher("root\\CIMV2", "SELECT * FROM Win32_CDROMDrive");
            foreach (ManagementObject wmi in searcher.Get())
            {
                try
                {
                    return wmi.GetPropertyValue("Drive").ToString();
                }
                catch (Exception)
                {
                    return "Unknown";
                }
            }
            return "Unknown";
        }
        private static string GetBIOSmaker()
        {
            ManagementObjectSearcher searcher = new ManagementObjectSearcher("root\\CIMV2", "SELECT * FROM Win32_BIOS");

            foreach (ManagementObject wmi in searcher.Get())
            {
                try
                {
                    return wmi.GetPropertyValue("Manufacturer").ToString();
                }
                catch (Exception)
                {
                    return "Unknown";
                }
            }
            return "Unknown";
        }

        private static string GetBIOSserNo()
        {
            ManagementObjectSearcher searcher = new ManagementObjectSearcher("root\\CIMV2", "SELECT * FROM Win32_BIOS");

            foreach (ManagementObject wmi in searcher.Get())
            {
                try
                {
                    return wmi.GetPropertyValue("SerialNumber").ToString();
                }
                catch (Exception)
                {
                    return "Unknown";
                }
            }
            return "Unknown";
        }

        private static string GetBIOScaption()
        {
            ManagementObjectSearcher searcher = new ManagementObjectSearcher("root\\CIMV2", "SELECT * FROM Win32_BIOS");

            foreach (ManagementObject wmi in searcher.Get())
            {
                try
                {
                    return wmi.GetPropertyValue("Caption").ToString();
                }
                catch (Exception)
                {
                    return "Unknown";
                }
            }
            return "Unknown";
        }

        private static string GetPhysicalMemory()
        {
            ManagementScope oMs = new ManagementScope();
            ObjectQuery oQuery = new ObjectQuery("SELECT Capacity FROM Win32_PhysicalMemory");
            ManagementObjectSearcher oSearcher = new ManagementObjectSearcher(oMs, oQuery);
            ManagementObjectCollection oCollection = oSearcher.Get();

            long MemSize = 0;
            long mCap = 0;

            foreach (ManagementObject obj in oCollection)
            {
                mCap = Convert.ToInt64(obj["Capacity"]);
                MemSize += mCap;
            }
            MemSize = (MemSize / 1024) / 1024;
            return MemSize.ToString() + "MB";
        }

        private static string GetNoRamSlots()
        {
            int MemSlots = 0;
            ManagementScope oMs = new ManagementScope();
            ObjectQuery oQuery2 = new ObjectQuery("SELECT MemoryDevices FROM Win32_PhysicalMemoryArray");
            ManagementObjectSearcher oSearcher2 = new ManagementObjectSearcher(oMs, oQuery2);
            ManagementObjectCollection oCollection2 = oSearcher2.Get();
            foreach (ManagementObject obj in oCollection2)
            {
                MemSlots = Convert.ToInt32(obj["MemoryDevices"]);
            }
            return MemSlots.ToString();
        }

        private static string GetCPUManufacturer()
        {
            string cpuMan = String.Empty;
            ManagementClass mgmt = new ManagementClass("Win32_Processor");
            ManagementObjectCollection objCol = mgmt.GetInstances();
            foreach (ManagementObject obj in objCol)
            {
                if (cpuMan == String.Empty)
                {
                    cpuMan = obj.Properties["Manufacturer"].Value.ToString();
                }
            }
            return cpuMan;
        }

        private static string GetCurrentLanguage()
        {
            ManagementObjectSearcher searcher = new ManagementObjectSearcher("root\\CIMV2", "SELECT * FROM Win32_BIOS");

            foreach (ManagementObject wmi in searcher.Get())
            {
                try
                {
                    return wmi.GetPropertyValue("CurrentLanguage").ToString();
                }
                catch (Exception)
                {
                    return "Unknown";
                }
            }
            return "Unknown";
        }

        private static string GetOSInformation()
        {
            ManagementObjectSearcher searcher = new ManagementObjectSearcher("SELECT * FROM Win32_OperatingSystem");

            foreach (ManagementObject wmi in searcher.Get())
            {
                try
                {
                    return ((string)wmi["Caption"]).Trim() + ", " + (string)wmi["Version"] + ", " + (string)wmi["OSArchitecture"];
                }
                catch (Exception)
                {
                    return "Unknown";
                }
            }
            return "Unknown";
        }

        private static String GetProcessorInformation()
        {
            ManagementClass mc = new ManagementClass("win32_processor");
            ManagementObjectCollection moc = mc.GetInstances();
            String info = String.Empty;

            foreach (ManagementObject mo in moc)
            {
                string name = (string)mo["Name"];
                name = name.Replace("(TM)", "™").Replace("(tm)", "™").Replace("(R)", "®").Replace("(r)", "®").Replace("(C)", "©").Replace("(c)", "©").Replace("    ", " ").Replace("  ", " ");

                info = name + ", " + (string)mo["Caption"] + ", " + (string)mo["SocketDesignation"];
            }
            return info;
        }
    }
}
