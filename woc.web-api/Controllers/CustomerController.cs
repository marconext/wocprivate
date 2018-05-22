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
    public class CustomerController: Controller
    {
        CustomerService _customerService;

        public CustomerController(CustomerService CustomerService)
        {
            this._customerService = CustomerService;
        }

        // GET api/project
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var r = await this._customerService.ListAllCustomersAsync();
            return Ok(r);
        }
    }
}
