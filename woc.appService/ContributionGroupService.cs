using System;
using System.Collections.Generic;
using System.Linq;

using woc.appDomain;
using woc.appInfrastructure.Repositories;
using woc.appInfrastructure.Dtos;
using System.Threading.Tasks;

namespace woc.appService
{
    public class ContributionGroupService
    {
        private readonly ContributionGroupRepository _ContributionGroupRepository;

        // Ctor
        public ContributionGroupService(ContributionGroupRepository ContributionGroupRepository) {
            this._ContributionGroupRepository = ContributionGroupRepository;
        }

        public async Task<IList<ContributionGroupDto>> ListAllContributionGroupsAsync() {
            var cc = await this._ContributionGroupRepository.GetAllAsync();
            IList<ContributionGroupDto> ContributionGroupDtos = new List<ContributionGroupDto>();
            foreach(ContributionGroup cg in cc){
                var d = new ContributionGroupDto();
                d.Id = cg.Id;
                d.Name = cg.Name;
                ContributionGroupDtos.Add(d);
            }
            return ContributionGroupDtos;
        }
    }
}
