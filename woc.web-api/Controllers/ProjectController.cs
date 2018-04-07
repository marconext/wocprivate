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
    public class ProjectController: Controller
    {
        ProjectService _projectService;

        public ProjectController(ProjectService projectService)
        {
            this._projectService = projectService;
        }

        // GET api/employees
        [HttpGet]
        // public async IActionResult<Task<IEnumerable<EmployeeDto>>> Get()
        public async Task<IActionResult> Get()
        {
            var r = await this._projectService.ListAllProjectsAsync();
            return Ok(r);
        }

        // GET api/project/GetProjectChildByKeyNamePaths
        [HttpGet("GetProjectChildRegionsByKeyNamePaths/{keyNamePath}")]
        public async Task<IActionResult> GetProjectChildRegionsByKeyNamePaths(string keyNamePath)
        {
            var r = await this._projectService.GetProjectChildRegionsByKeyNamePathsAsync(keyNamePath);
            return Ok(r);
        }
    }
}
