using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using woc.appService;

namespace woc.web_api.Controllers
{
    [Route("api/[controller]")]
    public class SystemInfoController  : Controller
    {
        SystemInfoService _systemInfoService;

        public SystemInfoController(SystemInfoService SystemInfoService)
        {
            this._systemInfoService = SystemInfoService;
        }


        // GET api/project
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try 
            {
                var r = await this._systemInfoService.GetInfoAsync();
                return Ok(r);
            }
            catch(Exception ex)
            {
                return BadRequest(new {message= ex.Message});
            }
        }
    }
}
