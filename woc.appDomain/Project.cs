using System;
using System.Collections.Generic;

namespace woc.appDomain
{
    public class Project
    {

        private List<Region> _regions = new List<Region>();
        private List<Offering> _offerings = new List<Offering>();

        private List<Skill> _skills = new List<Skill>();

        public Project(Guid? Id, string Name, string DXCServices, string Facts, string DXCSolution, string Betriebsleistung)
        {
            if(!Id.HasValue){
                this.Id = Guid.NewGuid();
            }
            else{
                this.Id = Id.Value;
            }

            this.DXCServices = DXCServices;
            this.Facts = Facts;
            this.DXCSolution = DXCSolution;
            this.Betriebsleistung = Betriebsleistung;
            
            this.Name = Name;
            this._regions = new List<Region>();
            this._offerings = new List<Offering>();
            this._skills = new List<Skill>();
        }

        public Project(Guid? Id, string Name)
        :this(Id, Name, "", "", "", "")
        {

        }

        public Guid Id {get; private set;}
        public string Name {get; private set;}

        public string DXCServices {get; private set;}
        public string Facts {get; private set;}
        public string DXCSolution {get; private set;}
        public string Betriebsleistung {get; private set;}

        public IList<Region> Regions { get{return this._regions.AsReadOnly();}}
        public IList<Offering> Offerings { get{return this._offerings.AsReadOnly();}}
        public IList<Skill> Skills { get{return this._skills.AsReadOnly();}}

        public void AddRegion(Region region)
        {
            if (region == null) {
                throw new ArgumentNullException("region");
            }

            if (this._regions.Exists(r => r.Id == region.Id)) {
                throw new Exception("Region already exists! " + region.Name);
            }
            this._regions.Add(region);
        }

        public void AddOffering(Offering offering)
        {
            if (offering == null) {
                throw new ArgumentNullException("offering");
            }

            if (this._offerings.Exists(o => o.Id == offering.Id)) {
                throw new Exception("Offering already exists! " + offering.Name);
            }
            this._offerings.Add(offering);
        }

        public void AddSkill(Skill skill)
        {
            if (skill == null) {
                throw new ArgumentNullException("skill");
            }

            if (this._skills.Exists(s => s.Id == skill.Id)) {
                throw new Exception("Skill already exists! " + skill.Name);
            }
            this._skills.Add(skill);
        }
    }
}
