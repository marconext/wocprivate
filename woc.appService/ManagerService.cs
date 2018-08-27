using System;
using System.Collections.Generic;
using System.Linq;

using woc.appDomain;
using woc.appInfrastructure.Repositories;
using woc.appInfrastructure.Dtos;
using System.Threading.Tasks;

namespace woc.appService
{
    public class ManagerService
    {
        private readonly ManagerRepository _ManagerRepository;

        // Ctor
        public ManagerService(ManagerRepository ManagerRepository) {
            this._ManagerRepository = ManagerRepository;
        }

        public async Task<IList<ManagerDto>> FindManagersAsync(string SearchText) {
            var pp = await this._ManagerRepository.FindManagersAsync(SearchText);
            IList<ManagerDto> ManagerDtos = new List<ManagerDto>();
            foreach(Manager r in pp){
                var d = new ManagerDto();
                d.Id = r.Id;
                d.Name = r.Name;
                ManagerDtos.Add(d);
            }
            return ManagerDtos;
        }
    }
}
