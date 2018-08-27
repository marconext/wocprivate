using System;

namespace woc.appDomain
{
    public class EmployeeSkill: IEntityBase
    {
        public EmployeeSkill(Guid id, string name, MaturityEnum maturity)
        {
            this.Id = id;
            this.Name = name;
            this.Maturity = maturity;
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
        public MaturityEnum Maturity { get; private set; }
    }
}