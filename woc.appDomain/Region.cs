using System;

namespace woc.appDomain
{
    public class Region
    {
        public Region(Guid Id, string name, string keyNamePath)
        {
            this.Id = Guid.NewGuid();
            this.Name = name;
            this.KeyNamePath = keyNamePath;
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string KeyNamePath { get; private set; }
    }
}