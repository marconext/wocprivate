using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using woc.appDomain;

namespace woc.appInfrastructure.Repositories
{
    public class ContributionGroupRepository: BaseRepository
    {
        public ContributionGroupRepository(string ConnectionString)
        {
            this.connectionString = ConnectionString;
            
        }

        public async Task<IEnumerable<ContributionGroup>> GetAllAsync()
        {
            using (var c = this.OpenConnection)
            {
                var cc = await c.QueryAsync<ContributionGroup>("SELECT Id, Name FROM ContributionGroups ORDER BY Name");
                return cc;
            }
        }
      
    }
}