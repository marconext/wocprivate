using System;

namespace woc.appDomain
{
    public class EmployeeSkill
    {
        public EmployeeSkill(string name, MaturityEnum maturity)
        {
            this.Name = name;
            this.Maturity = maturity;
        }

        public string Name { get; private set; }
        public MaturityEnum Maturity { get; private set; }
    }
}