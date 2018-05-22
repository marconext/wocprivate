using System;
using System.Collections.Generic;
using System.Linq;

using woc.appDomain;
using woc.appInfrastructure.Repositories;
using woc.appInfrastructure.Dtos;
using System.Threading.Tasks;

namespace woc.appService
{
    public class IndustryService
    {
        private readonly IndustryRepository _IndustryRepository;

        // Ctor
        public IndustryService(IndustryRepository IndustryRepository) {
            this._IndustryRepository = IndustryRepository;
        }

        public async Task<IList<IndustryDto>> ListAllIndustriesAsync() {
            var ii = await this._IndustryRepository.GetAllAsync();
            IList<IndustryDto> IndustryDtos = new List<IndustryDto>();
            foreach(Industry i in ii){
                var d = new IndustryDto();
                d.Id = i.Id;
                d.Name = i.Name;
                IndustryDtos.Add(d);
            }
            return IndustryDtos;
        }
    }
}
