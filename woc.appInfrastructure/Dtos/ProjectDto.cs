using System;
using System.Collections.Generic;

namespace woc.appInfrastructure.Dtos
{
    public class ProjectDto
    {
        public ProjectDto()
        {
            this.Regions = new List<RegionDto>();
            this.Offerings = new List<OfferingDto>();
            this.Skills = new List<SkillDto>();
        }

        public Guid Id {get; set;}
        public string Name {get; set;}
        public string DXCServices {get; set;}
        public string Facts {get; set;}
        public string DXCSolution {get; set;}
        public string Betriebsleistung {get; set;}
        public IList<RegionDto> Regions {get; set;}
        public IList<OfferingDto> Offerings {get; set;}
        public IList<SkillDto> Skills {get; set;}
    }
}