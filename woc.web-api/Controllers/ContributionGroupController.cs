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
    public class ContributionGroupController: Controller
    {
        ContributionGroupService _ContributionGroupService;

        public ContributionGroupController(ContributionGroupService ContributionGroupService)
        {
            this._ContributionGroupService = ContributionGroupService;
        }

        // GET api/ContributionGroup
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var r = await this._ContributionGroupService.ListAllContributionGroupsAsync();
            return Ok(r);
        }
    }
}
