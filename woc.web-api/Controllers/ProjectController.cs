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

        // GET api/project
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var r = await this._projectService.ListAllProjectsAsync();
            return Ok(r);
        }

        // GET api/project/Id
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetProject(Guid Id)
        {
            var r = await this._projectService.GetProjectByIdAsync(Id);
            return Ok(r);
        }

        // POST api/project/GetChildsByFilter
        // Nach Empfehlung ist eine Suche eine resource und wird mit POST erstellt. (in diesem Fall project/search)
        [HttpPost("searches")]
        public async Task<IActionResult> GetChildsByFilter([FromBody] ProjectFilter filter)
        {
            var pp = await this._projectService.GetChildsByFilter(filter);
            return Ok(pp);
        }

        // GET api/project/
        [HttpGet("GetProjectChildsByParentRegionKeyNamePath/{keyNamePath?}")]
        // public async IActionResult<Task<IEnumerable<EmployeeDto>>> Get()
        public async Task<IActionResult> GetProjectChildsByParentRegionKeyNamePath(string keyNamePath = "")
        {
            var pp = await this._projectService.GetProjectChildsByParentRegionKeyNamePathAsync(keyNamePath);
            return Ok(pp);
        }

        // GET api/project/GetProjectChildRegionsByKeyNamePaths
        [HttpGet("GetProjectChildRegionsByKeyNamePaths/{keyNamePat?}")]
        public async Task<IActionResult> GetProjectChildRegionsByKeyNamePaths(string keyNamePath = "")
        {
            var r = await this._projectService.GetProjectChildRegionsByKeyNamePathsAsync(keyNamePath);
            return Ok(r);
        }

        [HttpGet("GetProjectChildOfferingsByKeyNamePaths/{keyNamePat?}")]
        public async Task<IActionResult> GetProjectChildOfferingsByKeyNamePaths(string keyNamePath = "")
        {
            var r = await this._projectService.GetProjectChildOfferingsByKeyNamePathsAsync(keyNamePath);
            return Ok(r);
        }

        [HttpGet("GetProjectSkills")]
        public async Task<IActionResult> GetProjectSkills()
        {
            var r = await this._projectService.GetProjectSkills();
            return Ok(r);
        }

        [HttpGet("GetProjectCustomers")]
        public async Task<IActionResult> GetProjectCustomers()
        {
            var r = await this._projectService.GetProjectCustomers();
            return Ok(r);
        }        
    }
}
