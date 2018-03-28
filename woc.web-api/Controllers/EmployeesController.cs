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
    public class EmployeeController: Controller
    {
        EmployeeService _employeeService;

        public EmployeeController(EmployeeService employeeService)
        {
            this._employeeService = employeeService;
        }

        // GET api/employees
        [HttpGet]
        // public async IActionResult<Task<IEnumerable<EmployeeDto>>> Get()
        public async Task<IActionResult> Get()
        {
            var r = await this._employeeService.ListAllEmployeesAsync();
            return Ok(r);
        }
        // GET api/employee/Id
        [HttpGet]
        [Route("{id}")]
        // public async IActionResult<Task<IEnumerable<EmployeeDto>>> Get()
        public async Task<IActionResult> GetEmployee(Guid Id)
        {
            var r = await this._employeeService.GetEmplyeeByIdAsync(Id);
            return Ok(r);
        }

        [HttpPost]
        public async Task<IActionResult> SaveEmplyoeeBaseProfile([FromBody] SaveBaseProfileReq p)
        {

            await this._employeeService.SaveEmployeeBasProfileAsync(p.Id, p.Name);

            return Ok();
        }
    }

    // request classes
    public class SaveBaseProfileReq{
        public Guid Id;
        public string Name;
    }
}