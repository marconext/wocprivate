using System;
using woc.appDomain;

namespace woc.appInfrastructure.Dtos
{
    public class EmployeeRoleDto
    {
        public Guid RoleId { get; set; }
        public string Name { get; set; }
        public ContributionGroupDto ContributionGroup { get; set; }    
    }
}
