using System;
using System.Threading.Tasks;
using Dapper;
using woc.appInfrastructure.Dtos;

namespace woc.appInfrastructure.Repositories
{
    public class SystemInfoRepository : BaseRepository
    {

        public SystemInfoRepository(string ConnectionString)
        {
            connectionString = ConnectionString;
        }

        public async Task<SystemInfoDto> CheckAsync()
        {
            SystemInfoDto si = new SystemInfoDto();
            try
            {
                using (var c = this.OpenConnection)
                {
                    // arbitrary select statement.
                    var cc = await c.QueryAsync("SELECT top 1 * FROM Customers");
                    si.DbWorks = true;
                }
            }
            catch(Exception ex)
            {
                si.DbWorks = false;
                si.DbCheckError = ex.Message;
            }
            return si;
        }
    }
}