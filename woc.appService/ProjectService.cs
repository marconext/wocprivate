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
            ProjectDto res = new ProjectDto();
            var p = await this.projectRepository.GetById(Id);
            res.Name = p.Name;
            res.Id = p.Id;
            res.DXCServices = p.DXCServices;
            res.Facts = p.Facts;
            res.DXCSolution = p.DXCSolution;
            res.Betriebsleistung = p.Betriebsleistung;
            
            foreach(Region pr in p.Regions)
            {
                res.Regions.Add(new RegionDto() {Id = pr.Id, Name= pr.Name, KeyNamePath = pr.KeyNamePath});
            }
            foreach(Offering po in p.Offerings)
            {
                res.Offerings.Add(new OfferingDto() {Id = po.Id, Name= po.Name, KeyNamePath = po.KeyNamePath});
            }
            foreach(Skill ps in p.Skills)
            {
                res.Skills.Add(new SkillDto() {Id = ps.Id, Name= ps.Name});
            }
            return res;
        }

        public async Task<IList<ProjectDto>> GetChildsByFilter(ProjectFilter filter)
        {
            var pp = await this.projectRepository.GetChildsByFilter(filter);
            var projectDtos = new List<ProjectDto>();
            foreach(Project p in pp)
            {
                var d = new ProjectDto();
                d.Id = p.Id;
                d.Name = p.Name;
                foreach(Region r in p.Regions)
                {
                    var dr = new RegionDto();
                    dr.Id = r.Id;
                    dr.Name = r.Name;
                    dr.KeyNamePath = r.KeyNamePath;
                    d.Regions.Add(dr);
                }
                foreach(Offering o in p.Offerings)
                {
                    var doff = new OfferingDto();
                    doff.Id = o.Id;
                    doff.Name = o.Name;
                    doff.KeyNamePath = o.KeyNamePath;
                    d.Offerings.Add(doff);
                }
                foreach(Skill s in p.Skills)
                {
                    var ds = new SkillDto();
                    ds.Id = s.Id;
                    ds.Name = s.Name;
                    d.Skills.Add(ds);
                }
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
    }
}
