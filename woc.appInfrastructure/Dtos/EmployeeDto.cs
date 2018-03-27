using System.Collections.Generic;

namespace woc.appInfrastructure.Dtos
{
    public class EmployeeDto
    {
        public string Name {get; set;}
        public string Email {get; set;}

        public IList<EmployeeSkillDto> Skills {get; set;}

        public EmployeeDto()
        {
            this.Skills = new List<EmployeeSkillDto>();
        }
    }
}