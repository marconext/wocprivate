using System;
using System.Collections.Generic;

namespace woc.appInfrastructure.Dtos
{
    public class ProjectDto
    {
        public Guid Id {get; set;}
        public string Name {get; set;}

        public IList<RegionDto> Regions {get; set;}
        public IList<OfferingDto> Offerings {get; set;}

        public ProjectDto()
        {
            this.Regions = new List<RegionDto>();
            this.Offerings = new List<OfferingDto>();
        }
    }
}