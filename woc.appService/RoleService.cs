using System;
using System.Collections.Generic;
using System.Linq;

using woc.appDomain;
using woc.appInfrastructure.Repositories;
using woc.appInfrastructure.Dtos;
using System.Threading.Tasks;

namespace woc.appService
{
    public class RoleService
    {
        private readonly RoleRepository _RoleRepository;

        // Ctor
        public RoleService(RoleRepository RoleRepository) {
            this._RoleRepository = RoleRepository;
        }

        public async Task<IList<RoleDto>> ListAllRolesAsync() {
            var pp = await this._RoleRepository.GetAllAsync();
            IList<RoleDto> RoleDtos = new List<RoleDto>();
            foreach(Role r in pp){
                var d = new RoleDto();
                d.Id = r.Id;
                d.Name = r.Name;
                RoleDtos.Add(d);
            }
            return RoleDtos;
        }
    }
}
