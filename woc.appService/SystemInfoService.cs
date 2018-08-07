using System.Threading.Tasks;
using woc.appInfrastructure.Dtos;
using woc.appInfrastructure.Repositories;

namespace woc.appService
{
    public class SystemInfoService
    {
        private readonly SystemInfoRepository _systemInfoRepository;
        public SystemInfoService(SystemInfoRepository SystemInfoRepository)
        {
            this._systemInfoRepository = SystemInfoRepository;
        }

        public async Task<SystemInfoDto> GetInfoAsync() {
            SystemInfoDto si = await this._systemInfoRepository.CheckAsync();
            return si;
        }
    }
}