using System;
using System.Collections.Generic;

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
                projectDtos.Add(d);
            }
            return projectDtos;
        }

        public async Task<IEnumerable<RegionDto>> GetProjectChildRegionsByKeyNamePathsAsync(string keyNamePath)
        {
            var rr = await this.projectRepository.GetProjectChildRegionsByKeyNamePaths(keyNamePath);
            IList<RegionDto> regionDtos = new List<RegionDto>();
            foreach(Region r in rr){
                var d = new RegionDto();
                d.Id = r.Id;
                d.Name = r.Name;
                regionDtos.Add(d);
            }
            return regionDtos;
        }
    }
}
