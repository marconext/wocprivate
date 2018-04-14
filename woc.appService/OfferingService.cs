using System;
using System.Collections.Generic;
using System.Linq;

using woc.appDomain;
using woc.appInfrastructure.Repositories;
using woc.appInfrastructure.Dtos;
using System.Threading.Tasks;

namespace woc.appService
{
    public class OfferingService
    {
        private readonly OfferingRepository _OfferingRepository;

        // Ctor
        public OfferingService(OfferingRepository OfferingRepository) {
            this._OfferingRepository = OfferingRepository;
        }

        public async Task<IList<OfferingDto>> ListAllLocationsAsync() {
            var pp = await this._OfferingRepository.GetAllAsync();
            IList<OfferingDto> offeringDtos = new List<OfferingDto>();
            foreach(Offering r in pp){
                var d = new OfferingDto();
                d.Id = r.Id;
                d.Name = r.Name;
                d.KeyNamePath = r.KeyNamePath;
                offeringDtos.Add(d);
            }
            return offeringDtos;
        }
    }
}
