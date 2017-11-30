using System.Collections.Generic;


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
        public List<string> children;
        public string Name;
        public TYPE Type = TYPE.DIRECTORY;
        public long Size = 0;
        public bool Accessible = true;

        public DirectoryOrFile(string path)
        {
            Path = path;
            children = new List<string>();
            Name = System.IO.Path.GetFileName(Path);
        }
    }
}
