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
    public class OfferingController: Controller
    {
        OfferingService _OfferingService;

        public OfferingController(OfferingService OfferingService)
        {
            this._OfferingService = OfferingService;
        }

        // GET api/project
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var r = await this._OfferingService.ListAllLocationsAsync();
            return Ok(r);
        }
    }
}
