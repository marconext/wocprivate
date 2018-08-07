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
        IConverter _pdfConverter;

        public ProjectController(ProjectService projectService, IConverter pdfConverter)
        {
            this._projectService = projectService;
            this._pdfConverter = pdfConverter;
        }

        // GET api/project
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            try 
            {
                var r = await this._projectService.ListAllProjectsAsync();
                throw new Exception("something happend");
                return Ok(r);
            }
            catch(Exception ex)
            {
                return BadRequest(new {message= ex.Message});
            }
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
             try 
            {
                var pp = await this._projectService.GetChildsByFilter(filter);
                throw new Exception("something happend"); // force error only for debug
                return Ok(pp);
            }
            catch(Exception ex)
            {
                return BadRequest(new {message= ex.Message});
            }
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
            if (ret.Status == ServiceResponseStatusEnum.Error)
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

            sb.Append(@"
                <link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.5.0/css/font-awesome.min.css'>
            ");
            sb.AppendLine(@"<style>
                body {
                    font-family: Arial;
                }
                table {
                }
                td {
                    vertical-align: top;
                    marging: 10px;
                    padding: 10px;
                }
                td.dxcProjectTextBox {
                    width: 25%;
                }

                .new-page {
                    page-break-after: always;
                }

                .my-title {
                    border-bottom: 3px solid black;
                    marging: 10px;
                    padding: 10px;

                }

                </style>
                ");


            foreach (ProjectDto p in prjs)
            {
                sb.AppendLine(@"<table><tr><td style='text-align:right;'>
                <!-- <i class='fa fa-5x fa-caret-down'></i> -->
                <img src='http://localhost:4200/assets/DXCTechnologyWhite.png' width='200px;' />
                </td></tr></table>
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
                sb.AppendLine($"<td class='my-title'><i class='fa fa-2x fa-university'</i></td>");
                sb.AppendLine($"<td class='my-title'><i class='fa fa-2x fa-sun-o'</i></td>");
                sb.AppendLine($"<td class='my-title'><i class='fa fa-2x fa-line-chart'</i></td>");
                sb.AppendLine($"<td class='my-title'><i class='fa fa-2x fa-cogs'</i></td>");
                sb.AppendLine("</tr>");
                // sb.AppendLine("<tr>");
                // sb.AppendLine($"<td class='dxcProjectTextBox'>{p.DXCServices}</td>");
                // sb.AppendLine($"<td class='dxcProjectTextBox'>{p.Facts}</td>");
                // sb.AppendLine($"<td class='dxcProjectTextBox'>{p.DXCSolution}</td>");
                // sb.AppendLine($"<td class='dxcProjectTextBox'>{p.Betriebsleistung}</td>");
                // sb.AppendLine("</tr>");

                sb.AppendLine("<tr>");
                sb.AppendLine($"<td class='dxcProjectTextBox'><h4>Services</h4>{p.DXCServices}</td>");
                sb.AppendLine($"<td class='dxcProjectTextBox'><h4>Facts</h4>{p.Facts}</td>");
                sb.AppendLine($"<td class='dxcProjectTextBox'><h4>DXCSolution</h4>{p.DXCSolution}</td>");
                sb.AppendLine($"<td class='dxcProjectTextBox'><h4>Betriebsleistung</h4>{p.Betriebsleistung}</td>");
                sb.AppendLine("</tr>");


                // sb.AppendLine("<tr>");
                // sb.AppendLine($"<td class='dxcProjectTextBox'><i class='fa fa-times'</i><h4 class='my-title'>Services</h4>{p.DXCServices}</td>");
                // sb.AppendLine($"<td class='dxcProjectTextBox'><h4>Facts</h4>{p.Facts}</td>");
                // sb.AppendLine($"<td class='dxcProjectTextBox'><i class='fa fa-times'</i><h4>DXCSolution</h4>{p.DXCSolution}</td>");
                // sb.AppendLine($"<td class='dxcProjectTextBox'><h4>Betriebsleistung</h4>{p.Betriebsleistung}</td>");
                // sb.AppendLine("</tr>");
                sb.AppendLine("</table>");
                sb.AppendLine("<p class='new-page'></p>");

            }


            var doc = new HtmlToPdfDocument()
            {
                GlobalSettings = {
                    PaperSize = PaperKind.A4,
                    Orientation = Orientation.Landscape,
                },

                Objects = {
                    new ObjectSettings()
                    {
                        PagesCount = true,
                        HtmlContent = sb.ToString(),
                        WebSettings = { DefaultEncoding = "utf-8" },
                        // HeaderSettings = { FontSize = 9, Right = "Page [page] of [toPage]", Line = true, Spacing = 2.812 }
                        FooterSettings = {}
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

            pdf = _pdfConverter.Convert(doc);

            //return new FileContentResult(pdf, "application/pdf");
            return new FileContentResult(pdf, "application/octet-stream");
        }
    }
}
