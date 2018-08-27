using System;
using woc.appDomain;

namespace woc.appInfrastructure.Dtos
{
    public class EmployeeSkillDto
    {
        public Guid Id {get; set;}
        public string Name {get; set;}
        public int Maturity {get; set;}
    }
}