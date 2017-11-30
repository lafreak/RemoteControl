using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Client
{
    public class DirectoryOrFile
    {
        public enum TYPE
        {
            DIRECTORY,
            FILE,
            COMPUTER
        }

        public string Path;
        public TYPE Type = TYPE.DIRECTORY;
        public long Size = 0;
        public bool Accessible = true;
    }
}
