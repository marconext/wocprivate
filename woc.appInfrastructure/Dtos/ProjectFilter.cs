using System.Collections.Generic;

namespace woc.appInfrastructure.Dtos
{
    public class ProjectFilter
    {
        public ProjectFilter()
        {
            this.RegionKeyNames = new List<string>();
            this.OfferingKeyNames = new List<string>();
            this.SkillNames = new List<string>();
            this.CustomerNames = new List<string>();
        }
        public List<string> RegionKeyNames {get; set;}
        public List<string> OfferingKeyNames {get; set;}
        public List<string> SkillNames {get; set;}
        public List<string> CustomerNames {get; set;}
    }
}