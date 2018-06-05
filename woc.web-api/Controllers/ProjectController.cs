using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using woc.appInfrastructure.Dtos;
using woc.appService;
using DinkToPdf;
using DinkToPdf.Contracts;
using System.Text;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace woc.web_api.Controllers
{
    [Route("api/[controller]")]
    public class ProjectController : Controller
    {
        ProjectService _projectService;
        IConverter _converter;

        public ProjectController(ProjectService projectService, IConverter converter)
        {
            this._projectService = projectService;
            this._converter = converter;
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

        [HttpGet]
        [Route("GetIdByName/{name}")]
        public async Task<IActionResult> GetProjectIdByName(string Name)
        {
            var id = await this._projectService.GetProjectIdByNameAsync(Name);
            return Ok(id);
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

        [HttpGet("GetProjectIndustries")]
        public async Task<IActionResult> GetProjectIndustries()
        {
            var r = await this._projectService.GetProjectIndustries();
            return Ok(r);
        }

        [HttpPost("SaveProject")]
        public async Task<IActionResult> SaveProject([FromBody] ProjectDto ProjectDto)
        {
            ServiceResponse ret = await this._projectService.SaveProject(ProjectDto);
            if(ret.Status == ServiceResponseStatusEnum.Error)
            {
                return BadRequest(ret);
            }
           
            return Ok();
        }

        [HttpPost("DeleteProjects")]
        public async Task<IActionResult> DeleteProjects([FromBody] IList<Guid> ProjectIds)
        {
            await this._projectService.DeleteProjectsAsync(ProjectIds);
            return Ok();
        }

        [HttpPost("CreatePdfForIds")]
        public IActionResult CreatePdfForIds([FromBody] IList<Guid> ids)
        {

            IList<Guid> _ids = new List<Guid>();
            byte[] pdf;

            // _ids.Add(new Guid("315BF4B2-7DC5-46B8-9F47-C1CE9BA27202")); // Project 1
            // _ids.Add(new Guid("24C51C88-9EE6-4680-B34C-63DCED09C21F"));
            // _ids.Add(new Guid("7A925511-3B25-4931-917C-704FB5531C54"));

            _ids = ids;

            StringBuilder sb = new StringBuilder();

            IList<ProjectDto> prjs = new List<ProjectDto>();

            foreach (Guid id in _ids)
            {
                var p = this._projectService.GetProjectByIdAsync(id).Result;
                prjs.Add(p);
            }

            sb.Append(@"");

            foreach (ProjectDto p in prjs)
            {
                sb.AppendLine(@"<style>
                body {
                    font-family: Arial;
                }
                table {
                }
                td {
                    vertical-align: top;
                }
                td.dxcProjectTextBox {
                    border: 1px solid #000;
                }
                </style>
                ");

                sb.AppendLine("<table>");

                sb.AppendLine("<tr>");
                sb.AppendLine("<td>Name</td><td>:&nbsp;</td>");
                sb.AppendLine($"<td><strong>{p.Name}</strong></td>");
                sb.AppendLine("</tr>");

                sb.AppendLine("<tr>");
                sb.AppendLine("<td>Customer</td><td>:&nbsp;</td>");
                sb.AppendLine($"<td>{p.Customer.Name}</td>");
                sb.AppendLine("</tr>");
                if (p.Industry != null)
                {
                    sb.AppendLine("<tr>");
                    sb.AppendLine("<td>Industry</td><td>:&nbsp;</td>");
                    sb.AppendLine($"<td>{p.Industry.Name}</td>");
                    sb.AppendLine("</tr>");
                }

                sb.AppendLine("<tr>");
                sb.AppendLine("<td>Offerings</td><td>:&nbsp;</td>");
                sb.AppendLine("<td>");
                foreach (OfferingDto o in p.Offerings)
                {
                    sb.Append($"({o.Name}) ");
                }
                sb.AppendLine("</td>");
                sb.AppendLine("</tr>");

                sb.AppendLine("</table>");

                sb.AppendLine("<table style='width:100%'>");
                sb.AppendLine("<tr>");
                sb.AppendLine($"<td class='dxcProjectTextBox'><h4>Services</h4>{p.DXCServices}</td>");
                sb.AppendLine($"<td class='dxcProjectTextBox'><h4>Facts</h4>{p.Facts}</td>");
                sb.AppendLine($"<td class='dxcProjectTextBox'><h4>DXCSolution</h4>{p.DXCSolution}</td>");
                sb.AppendLine($"<td class='dxcProjectTextBox'><h4>Betriebsleistung</h4>{p.Betriebsleistung}</td>");

                sb.AppendLine("</tr>");
                sb.AppendLine("</table>");
                sb.AppendLine("<hr />");

            }


            var doc = new HtmlToPdfDocument()
            {
                GlobalSettings = {
                    PaperSize = PaperKind.A4,
                    Orientation = Orientation.Portrait,
                },

                Objects = {
                    new ObjectSettings()
                    {
                        PagesCount = true,
                        HtmlContent = sb.ToString(),
                        WebSettings = { DefaultEncoding = "utf-8" },
                        HeaderSettings = { FontSize = 9, Right = "Page [page] of [toPage]", Line = true, Spacing = 2.812 }
                    },
                    // new ObjectSettings()
                    // {
                    //     Page = "http://google.com/",
                    // },
                    //  new ObjectSettings()
                    // {
                    //     Page = "https://github.com/",
                         
                    // }
                }
            };

            pdf = _converter.Convert(doc);

            //return new FileContentResult(pdf, "application/pdf");
            return new FileContentResult(pdf, "application/octet-stream");
        }
    }
}
