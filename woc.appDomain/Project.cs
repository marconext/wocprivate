using System;
using System.Collections.Generic;

namespace woc.appDomain
{
    public class Project
    {

        private List<Region> _regions = new List<Region>();
        private List<Offering> _offerings = new List<Offering>();

        public Project(Guid? Id, string Name)
        {
            if(!Id.HasValue){
                this.Id = Guid.NewGuid();
            }
            else{
                this.Id = Id.Value;
            }
            
            this.Name = Name;
            this._regions = new List<Region>();
            this._offerings = new List<Offering>();
        }

        public Guid Id {get; private set;}
        public string Name {get; private set;}

        public IList<Region> Regions { get{return this._regions.AsReadOnly();}}
        public IList<Offering> Offerings { get{return this._offerings.AsReadOnly();}}

        public void AddRegion(Region region)
        {
            if (region == null) {
                throw new ArgumentNullException("region");
            }

            if (this._regions.Contains(region)) {
                throw new Exception("Region already exists! " + region.Name);
            }
            this._regions.Add(region);
        }

        public void AddOffering(Offering offering)
        {
            if (offering == null) {
                throw new ArgumentNullException("offering");
            }

            if (this._offerings.Contains(offering)) {
                throw new Exception("Offering already exists! " + offering.Name);
            }
            this._offerings.Add(offering);
        }
    }
}
