using System;
using System.Collections.Generic;
using System.Linq;

using woc.appDomain;
using woc.appInfrastructure.Repositories;
using woc.appInfrastructure.Dtos;
using System.Threading.Tasks;

namespace woc.appService
{
    public class WorkPlaceService
    {
        private readonly WorkPlaceRepository _WorkPlaceRepository;

        // Ctor
        public WorkPlaceService(WorkPlaceRepository WorkPlaceRepository) {
            this._WorkPlaceRepository = WorkPlaceRepository;
        }

        public async Task<IEnumerable<WorkPlace>> GetAllAsync(){
            var rr = await this._WorkPlaceRepository.GetAllAsync();
            return rr;
        }

        public async Task<IEnumerable<string>> GetCountries(){
            var pp = await this._WorkPlaceRepository.GetCountries();
            return pp;
        }
        public async Task<IEnumerable<string>> GetCitiesByCountry(string Country){
            var pp = await this._WorkPlaceRepository.GetCitiesByCountry(Country);
            return pp;
        }
        public async Task<IEnumerable<string>> GetWorkplacesByCountryCity( string Country, string City){
            var pp = await this._WorkPlaceRepository.GetWorkplacesByCountryCity(Country, City);
            return pp;
        }
        public async Task<WorkPlace> GetWorkplaceByCountryCityWorkPlace(string Country, string City, string WorkPlaceName){
            var wp = await this._WorkPlaceRepository.GetWorkplaceByCountryCityWorkPlace(Country, City, WorkPlaceName);
            return wp;
        }
    }
}
