using System;
using System.Collections.Generic;
using System.Linq;

using woc.appDomain;
using woc.appInfrastructure.Repositories;
using woc.appInfrastructure.Dtos;
using System.Threading.Tasks;

namespace woc.appService
{
    public class SkillService
    {
        private readonly SkillRepository _SkillRepository;

        // Ctor
        public SkillService(SkillRepository SkillRepository) {
            this._SkillRepository = SkillRepository;
        }
        public async Task<IList<SkillDto>> ListAllSkillsAsync() {
            var pp = await this._SkillRepository.GetAllAsync();
            IList<SkillDto> SkillDtos = new List<SkillDto>();
            foreach(Skill r in pp){
                var d = new SkillDto();
                d.Id = r.Id;
                d.Name = r.Name;

                d.Maturity = 99;
                SkillDtos.Add(d);
            }
            return SkillDtos;
        }
    }
}
