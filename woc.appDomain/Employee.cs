using System;
using System.Collections.Generic;

namespace woc.appDomain
{
    public class Employee
    {

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
            this.Skills = new List<EmployeeSkill>();
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public string Email { get; private set; }
        public IList<EmployeeSkill> Skills { get; private set; } // todo make readonly

        public void SetBaseProfile(string Name, string Email) {
            this.Name = Name;
            this.Email = Email;
        }

        public void AddSkill(string name, MaturityEnum maturity) {
            this.Skills.Add(new EmployeeSkill(name, maturity));
        }
    }
}
