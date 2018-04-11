using System;
using System.Collections.Generic;
using System.Linq;

using woc.appDomain;
using woc.appInfrastructure.Repositories;
using woc.appInfrastructure.Dtos;
using System.Threading.Tasks;

namespace woc.appService
{
    public class RegionService
    {
        private readonly RegionRepository _regionRepository;

        // Ctor
        public RegionService(RegionRepository regionRepository) {
            this._regionRepository = regionRepository;
        }

        public async Task<IList<RegionDto>> ListAllLocationsAsync() {
            var pp = await this._regionRepository.GetAllAsync();
            IList<RegionDto> RegionDtos = new List<RegionDto>();
            foreach(Region r in pp){
                var d = new RegionDto();
                d.Id = r.Id;
                d.Name = r.Name;
                d.KeyNamePath = r.KeyNamePath;
                RegionDtos.Add(d);
            }
            return RegionDtos;
        }
    }
}
