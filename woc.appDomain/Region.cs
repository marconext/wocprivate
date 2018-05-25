using System;

namespace woc.appDomain
{
    public class Region: IEntityBase
    {
        public Region(Guid? Id, string name, string keyNamePath)
        {
            if(!Id.HasValue){
                this.Id = Guid.NewGuid();
            } else {
                this.Id = Id.Value;
            }
            
            
            this.Name = name;
            this.KeyNamePath = keyNamePath;
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string KeyNamePath { get; private set; }
    }
}