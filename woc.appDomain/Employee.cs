using System;
using System.Collections.Generic;

namespace woc.appDomain
{
    public class Employee
    {
        private List<EmployeeSkill> _skills;
        private List<AvailabilityEntry> _availabilites;


        public Employee(Guid? Id, string Name, string Email)
        {
            if(!Id.HasValue){
                this.Id = Guid.NewGuid();
            }
            else{
                this.Id = Id.Value;
            }
            
            this.Name = Name;
            this.Email = Email;
            this.Email = "suppressed (privacy)";
            this._skills = new List<EmployeeSkill>();
            this._availabilites = new List<AvailabilityEntry>();
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public IList<EmployeeSkill> Skills { get{return this._skills.AsReadOnly();}}
        public IList<AvailabilityEntry> Availability { get{return this._availabilites.AsReadOnly();}}

        public void SetBaseProfile(string Name, string Email) {
            this.Name = Name;
            this.Email = Email;
            this.Email = "suppressed (privacy)";
        }

        public void AddSkill(string name, MaturityEnum maturity) {
            this._skills.Add(new EmployeeSkill(name, maturity));
        }
        public void AddAvailability(int Year, int Month, int Precentage) {
            this._availabilites.Add(new AvailabilityEntry(Year, Month, Precentage));
        }
    }
}
