using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace Client
{
    public class Stream
    {
        public static bool Status;

        public static void Run()
        {
            while (true)
            {
                if (Status)
                    ProcessFrame();

                Thread.Sleep(10);
            }
        }

        public static void ProcessFrame()
        {
            string file;

            try
            {
                file = Engine.Instance.TakeFrame(12);
            }
            catch (Exception e)
            {
                return;
            }

            lock (Program.socket)
            {
                try { Program.socket.Emit("frame", "image/png;base64," + file); } catch (Exception) { }
            }
        }
    }
}