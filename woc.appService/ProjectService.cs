using System;
using System.Collections.Generic;
using System.Linq;

using woc.appDomain;
using woc.appInfrastructure.Repositories;
using woc.appInfrastructure.Dtos;
using System.Threading.Tasks;

namespace woc.appService
{
    public class ProjectService
    {
        private readonly ProjectRepository projectRepository;

        // Ctor
        public ProjectService(ProjectRepository projectRepository) {
            this.projectRepository = projectRepository;
        }

        public async Task<IList<ProjectDto>> ListAllProjectsAsync() {
            var pp = await this.projectRepository.GetAllAsync();
            IList<ProjectDto> projectDtos = new List<ProjectDto>();
            foreach(Project e in pp){
                var d = new ProjectDto();
                d.Id = e.Id;
                d.Name = e.Name;
                foreach (RegionDto r in d.Regions){
                    d.Regions.Add(new RegionDto() {Id = r.Id, Name= r.Name, KeyNamePath = r.KeyNamePath});
                }
                projectDtos.Add(d);
            }
            return projectDtos;
        }

        public async Task<ProjectDto> GetProjectByIdAsync(Guid Id) {
            var p = await this.projectRepository.GetById(Id);
            ProjectDto resDto = this.Map(p);
            return resDto;
        }

        public async Task<Guid> GetProjectIdByNameAsync(string Name)
        {
            var id = await this.projectRepository.GetIdByName(Name);
            return id;
        }

        public async Task<IList<ProjectDto>> GetChildsByFilter(ProjectFilter filter)
        {
            var pp = await this.projectRepository.GetChildsByFilter(filter);
            var projectDtos = new List<ProjectDto>();
            foreach(Project p in pp)
            {
                var d = this.Map(p);
                projectDtos.Add(d);
            }
            return projectDtos;
        }

        public async Task<IList<ProjectDto>> GetProjectChildsByParentRegionKeyNamePathAsync(string keyNamePath) {
            var pp = await this.projectRepository.GetProjectChildsByParentRegionKeyNamePath(keyNamePath);
            IList<ProjectDto> projectDtos = new List<ProjectDto>();
            foreach(Project e in pp){
                var d = new ProjectDto();
                d.Id = e.Id;
                d.Name = e.Name;
                foreach (Region r in e.Regions){
                    d.Regions.Add(new RegionDto() {Id = r.Id, Name= r.Name, KeyNamePath = r.KeyNamePath});
                }
                projectDtos.Add(d);
            }
            return projectDtos;
        }

        public async Task<IEnumerable<RegionDto>> GetProjectChildRegionsByKeyNamePathsAsync(string keyNamePath)
        {
            var rr = await this.projectRepository.GetProjectChildRegionsByKeyNamePath(keyNamePath);
            IList<RegionDto> regionDtos = new List<RegionDto>();
            foreach(Region r in rr){
                var d = new RegionDto();
                d.Id = r.Id;
                d.Name = r.Name;
                d.KeyNamePath = r.KeyNamePath;
                regionDtos.Add(d);
            }
            return regionDtos;
        }

        public async Task<IEnumerable<OfferingDto>> GetProjectChildOfferingsByKeyNamePathsAsync(string keyNamePath)
        {
            var rr = await this.projectRepository.GetProjectChildOfferingsByKeyNamePath(keyNamePath);
            IList<OfferingDto> offeringDtos = new List<OfferingDto>();
            foreach(Offering o in rr){
                var d = new OfferingDto();
                d.Id = o.Id;
                d.Name = o.Name;
                d.KeyNamePath = o.KeyNamePath;
                offeringDtos.Add(d);
            }
            return offeringDtos;
        }

        public async Task<IEnumerable<SkillDto>> GetProjectSkills() {
            var pp = await this.projectRepository.GetProjectSkills();
            IList<SkillDto> skillDtos = new List<SkillDto>();
            foreach(Skill s in pp){
                var d = new SkillDto();
                d.Id = s.Id;
                d.Name = s.Name;
                skillDtos.Add(d);
            }
            return skillDtos;
        }
        public async Task<IEnumerable<CustomerDto>> GetProjectCustomers() {
            var pp = await this.projectRepository.GetProjectCustomers();
            IList<CustomerDto> CustomerDtos = new List<CustomerDto>();
            foreach(Customer c in pp){
                var d = new CustomerDto();
                d.Id = c.Id;
                d.Name = c.Name;
                CustomerDtos.Add(d);
            }
            return CustomerDtos;
        }

        public async Task<IEnumerable<IndustryDto>> GetProjectIndustries() {
            var pp = await this.projectRepository.GetProjectIndustries();
            IList<IndustryDto> IndustryDto = new List<IndustryDto>();
            foreach(Industry c in pp){
                var d = new IndustryDto();
                d.Id = c.Id;
                d.Name = c.Name;
                IndustryDto.Add(d);
            }
            return IndustryDto;
        }

        public async Task SaveProject(ProjectDto ProjectDto)
        {
            // validate
            // save
            if(ProjectDto.Id == Guid.Empty)
            {
                ProjectDto.Id = Guid.NewGuid();
            }

            if (ProjectDto.Customer == null) {
                throw new Exception("Customer is mandatory!");
            }
            
            Project proj = new Project(ProjectDto.Id,ProjectDto.Name,ProjectDto.DXCServices,ProjectDto.Facts,ProjectDto.DXCSolution,ProjectDto.Betriebsleistung);
            proj.SetCustomer(new Customer(ProjectDto.Customer.Id, ProjectDto.Customer.Name));
            if(ProjectDto.Industry != null) 
            {
                proj.SetIndustry(new Industry(ProjectDto.Industry.Id, ProjectDto.Industry.Name));
            }
            
            foreach(SkillDto s in ProjectDto.Skills)
            {
                proj.AddSkill(new Skill(s.Id,s.Name));
            }
            foreach(RegionDto r in ProjectDto.Regions)
            {
                proj.AddRegion(new Region(r.Id, r.Name, r.KeyNamePath));
            }
           
            foreach(OfferingDto o in ProjectDto.Offerings)
            {
                proj.AddOffering(new Offering(o.Id, o.Name, o.KeyNamePath));
            }
           
            await this.projectRepository.SaveProjectAsync(proj);
        }

        public async Task DeleteProjectsAsync(IList<Guid> ProjectIds)
        {
            await this.projectRepository.DeleteProjectsAsync(ProjectIds);
        }

        private ProjectDto Map(Project project)
        {
            var projectDto = new ProjectDto();
            projectDto.Id = project.Id;
            projectDto.Name = project.Name;
            projectDto.DXCServices = project.DXCServices;
            projectDto.Facts = project.Facts;
            projectDto.DXCSolution = project.DXCSolution;
            projectDto.Betriebsleistung = project.Betriebsleistung;

            if(project.Customer != null)
            {
                var dc = new CustomerDto();
                dc.Id = project.Customer.Id;
                dc.Name = project.Customer.Name;
                projectDto.Customer = dc;
            }
            if(project.Industry != null)
            {
                var di = new IndustryDto();
                di.Id = project.Industry.Id;
                di.Name = project.Industry.Name;
                projectDto.Industry = di;
            }
            foreach(Region r in project.Regions)
            {
                var dr = new RegionDto();
                dr.Id = r.Id;
                dr.Name = r.Name;
                dr.KeyNamePath = r.KeyNamePath;
                projectDto.Regions.Add(dr);
            }
            foreach(Offering o in project.Offerings)
            {
                var doff = new OfferingDto();
                doff.Id = o.Id;
                doff.Name = o.Name;
                doff.KeyNamePath = o.KeyNamePath;
                projectDto.Offerings.Add(doff);
            }
            foreach(Skill s in project.Skills)
            {
                var ds = new SkillDto();
                ds.Id = s.Id;
                ds.Name = s.Name;
                projectDto.Skills.Add(ds);
            }
            return projectDto;
        }
    }
}
