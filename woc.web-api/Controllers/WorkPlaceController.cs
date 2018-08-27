using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using woc.appInfrastructure.Dtos;
using woc.appService;

namespace woc.web_api.Controllers
{
    [Route("api/[controller]")]
    public class WorkPlaceController: Controller
    {
        WorkPlaceService _WorkPlaceService;

        public WorkPlaceController(WorkPlaceService WorkPlaceService)
        {
            this._WorkPlaceService = WorkPlaceService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var r = await this._WorkPlaceService.GetAllAsync();
            return Ok(r);
        }

        [HttpGet]
        [Route("GetCountries")]
        public async Task<IActionResult> GetCountries()
        {
            var r = await this._WorkPlaceService.GetCountries();
            return Ok(r);
        }
        [HttpGet]
        [Route("GetCitiesByCountry")]
        public async Task<IActionResult> GetCitiesByCountry(string Country)
        {
            var r = await this._WorkPlaceService.GetCitiesByCountry(Country);
            return Ok(r);
        }
        [HttpPost]
        [Route("GetWorkplacesByCountryCity")]
        public async Task<IActionResult> GetWorkplacesByCountryCity([FromBody] WorkPlaceDto WorkPlace)
        {
            var r = await this._WorkPlaceService.GetWorkplacesByCountryCity(WorkPlace.Country, WorkPlace.City);
            return Ok(r);
        }

        [HttpPost]
        [Route("GetWorkplaceByCountryCityWorkPlace")]
        public async Task<IActionResult> GetWorkplaceByCountryCityWorkPlace([FromBody] WorkPlaceDto WorkPlce){
            var r = await this._WorkPlaceService.GetWorkplaceByCountryCityWorkPlace(WorkPlce.Country, WorkPlce.City, WorkPlce.Name);
            return Ok(r);
        }
    }
}
