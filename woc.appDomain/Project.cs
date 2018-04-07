using System;
using System.Collections.Generic;

namespace woc.appDomain
{
    public class Project
    {

        public Project(Guid? Id, string Name)
        {
            if(!Id.HasValue){
                this.Id = Guid.NewGuid();
            }
            else{
                this.Id = Id.Value;
            }
            
            this.Name = Name;
            this.Regions = new List<Region>();
        }

        public Guid Id {get; private set;}
        public string Name {get; private set;}

        public IList<Region> Regions { get; private set; } // TODO make readonly

        public void AddRegion(Region region)
        {
            if (region == null) {
                throw new ArgumentNullException("region");
            }

            if (this.Regions.Contains(region)) {
                throw new Exception("Region already exists! " + region.Name);
            }

            this.Regions.Add(region);
        }
    }
}
