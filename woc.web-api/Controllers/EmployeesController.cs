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
    }
}