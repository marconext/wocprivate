using System.Collections.Generic;

namespace woc.appInfrastructure.Dtos
{
    public class ProjectFilter
    {
        public ProjectFilter()
        {
            this.PlainSearchTerm = "";
            this.RegionKeyNames = new List<string>();
            this.OfferingKeyNames = new List<string>();
            this.SkillNames = new List<string>();
            this.CustomerNames = new List<string>();
            this.IndustryNames = new List<string>();
        }

        public string PlainSearchTerm {get; set;}
        public List<string> RegionKeyNames {get; set;}
        public List<string> OfferingKeyNames {get; set;}
        public List<string> SkillNames {get; set;}
        public List<string> CustomerNames {get; set;}
        public List<string> IndustryNames {get; set;}
    }
}