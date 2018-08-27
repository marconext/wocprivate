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
    public class ManagerController: Controller
    {
        ManagerService _ManagerService;

        public ManagerController(ManagerService ManagerService)
        {
            this._ManagerService = ManagerService;
        }
       
        [HttpGet]
        [Route("FindManagersAsync")]
        public async Task<IActionResult> FindManagersAsync(string SearchText)
        {
            var r = await this._ManagerService.FindManagersAsync(SearchText);
            return Ok(r);
        }
    }
}
