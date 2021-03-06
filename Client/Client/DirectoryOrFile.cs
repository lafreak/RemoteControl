﻿using System.Collections.Generic;


namespace Client
{
    public class DirectoryOrFile
    {
        public enum TYPE
        {
            COMPUTER,
            DIRECTORY,
            FILE
        }

        public string fullPath;
        public List<string> children;
        public string name;
        public TYPE type = TYPE.DIRECTORY;
        public long Size = 0;
        public bool Accessible = true;

        public DirectoryOrFile(string path)
        {
            fullPath = path;
            children = new List<string>();
            name = System.IO.Path.GetFileName(fullPath);
            if (name == string.Empty)
            {
                name = path.Replace("\\", string.Empty);
                fullPath = name;
            }
        }
    }
}
