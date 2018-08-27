using System;

namespace woc.appDomain
{
    public class EmployeeRole: IEntityBase
    {
        public EmployeeRole(){

            // default constructor, for dapper! 
            // needs maybe a redesign.
        }
        public EmployeeRole(Guid id, string name, ContributionGroup contributionGroup)
        {
            this.Id = id;
            this.Name = name;
            this.ContributionGroup = contributionGroup;
        }
        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public ContributionGroup ContributionGroup { get; private set; }
    }
}