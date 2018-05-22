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
    public class IndustryController: Controller
    {
        IndustryService _industryService;

        public IndustryController(IndustryService IndustryService)
        {
            this._industryService = IndustryService;
        }

        // GET api/project
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var r = await this._industryService.ListAllIndustriesAsync();
            return Ok(r);
        }
    }
}
