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
        static void Main(string[] args)
        {
            Socket socket = IO.Socket("http://localhost:6777", new IO.Options
            {
                ExtraHeaders = new Dictionary<string, string>
                {
                    ["Is-Client"] = "true"
                }
            });

            Console.ReadKey();
        }
    }
}
