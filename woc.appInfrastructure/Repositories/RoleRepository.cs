using System.Collections.Generic;
using System.Threading.Tasks;
using Dapper;
using woc.appDomain;

namespace woc.appInfrastructure.Repositories
{
    public class RoleRepository: BaseRepository
    {
        public RoleRepository(string ConnectionString)
        {
            this.connectionString = ConnectionString;
            
        }

        public async Task<IEnumerable<Role>> GetAllAsync()
        {
            using (var c = this.OpenConnection)
            {
                var rr = await c.QueryAsync<Role>("SELECT Id, Name FROM Roles ORDER BY Name");
                return rr;
            }
        }
      
    }
}