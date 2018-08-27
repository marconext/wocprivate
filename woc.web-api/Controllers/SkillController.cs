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
    public class SkillController: Controller
    {
        SkillService _skillService;

        public SkillController(SkillService SkillService)
        {
            this._skillService = SkillService;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var r = await this._skillService.ListAllSkillsAsync();
            return Ok(r);
        }
    }
}
