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
    public class RegionController: Controller
    {
        RegionService _regionService;

        public RegionController(RegionService RegionService)
        {
            this._regionService = RegionService;
        }

        // GET api/project
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var r = await this._regionService.ListAllLocationsAsync();
            return Ok(r);
        }
    }
}
