using System;
using System.Collections.Generic;

namespace woc.appInfrastructure.Dtos
{
    public class EmployeeDto
    {
        public Guid Id {get; set;}
        public string Name {get; set;}
        public string Email {get; set;}
        public IList<EmployeeSkillDto> Skills {get; set;}
        public IList<AvailabilityEntryDto> Availability {get; set;}
        public IList<EmployeeRoleDto> Roles {get; set;}
        public WorkPlaceDto WorkPlace {get; set;}
        public ManagerDto Manager {get; set;}

        public EmployeeDto()
        {
            this.Skills = new List<EmployeeSkillDto>();
            this.Availability = new List<AvailabilityEntryDto>();
            this.Roles = new List<EmployeeRoleDto>();
        }
    }
}