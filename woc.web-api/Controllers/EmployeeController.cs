using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using woc.appInfrastructure.Dtos;
using woc.appService;

namespace woc.web_api.Controllers
{
    [Route("api/[controller]")]
    public class EmployeeController : Controller
    {
        EmployeeService _employeeService;

        public EmployeeController(EmployeeService employeeService)
        {
            this._employeeService = employeeService;
        }

        // GET api/employees
        [HttpGet]
        //[Authorize]
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

        // [HttpPost]
        // public async Task<IActionResult> SaveEmplyoeeBaseProfile([FromBody] SaveBaseProfileReq p)
        // {

        //     await this._employeeService.SaveEmployeeBasProfileAsync(p.Id, p.Name, p.Email);
        //     return Ok();
        // }


        [HttpPost("Save")]
        public async Task<IActionResult> Save([FromBody] EmployeeDto employee)
        {
            ServiceResponse ret = await this._employeeService.SaveEmployeeAsync(employee);
            if (ret.Status == ServiceResponseStatusEnum.Error)
            {
                return BadRequest(ret);
            }
            return Ok();
        }

        [HttpPost("DeleteEmployees")]
        public async Task<IActionResult> DeleteProjects([FromBody] IList<Guid> EmployeeIds)
        {
            await this._employeeService.DeleteEmployeesAsync(EmployeeIds);
            return Ok();
        }

        [HttpPost]
        [Route("SaveEmplyoeeAvailability")]
        public async Task<IActionResult> SaveEmplyoeeAvailability([FromBody] SaveEmployeeAvailabilityReq p)
        {
            await this._employeeService.SaveEmployeeAvailability(p.EmployeeId, p.Year, p.Month, p.Precentage);
            return Ok();
        }
    }

    // request classes
    public class SaveBaseProfileReq
    {
        public Guid Id;
        public string Name;
        public string Email;

    }

    public class SaveEmployeeAvailabilityReq
    {
        public Guid EmployeeId;
        public int Year;
        public int Month;
        public int Precentage;
    }
}