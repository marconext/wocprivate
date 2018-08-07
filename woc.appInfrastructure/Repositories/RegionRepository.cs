using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper; // this extends idbconnection with .execute(), ...
using woc.appDomain;
using woc.appInfrastructure.Dtos;

namespace woc.appInfrastructure.Repositories
{
    public class RegionRepository: BaseRepository
    {
        public RegionRepository(string ConnectionString)
        {
            connectionString = ConnectionString;
        }
        public async Task<IEnumerable<Region>> GetAllAsync()
        {
            using (var c = this.OpenConnection)
            {
                // geht var r = c.Query<Location>("SELECT Name FROM Location").Select(row => new Location((string)row.Name));
                // geht var r = c.Query<Location>("SELECT Name FROM Location").Select(row => new Location(row.Name));
                var pp = await c.QueryAsync<Region>("SELECT Id, Name, KeyNamePath FROM Regions ORDER BY KeyNamePath");
                return pp;
            }
        }
    }
}
