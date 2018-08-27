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
    public class RoleController: Controller
    {
        RoleService _roleService;

        public RoleController(RoleService RoleService)
        {
            this._roleService = RoleService;
        }

        // GET api/Role
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var r = await this._roleService.ListAllRolesAsync();
            return Ok(r);
        }
    }
}
