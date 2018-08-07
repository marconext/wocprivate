using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper; // this extends idbconnection with .execute(), ...
using woc.appDomain;

namespace woc.appInfrastructure.Repositories
{
    public class CustomerRepository : BaseRepository
    {
        public CustomerRepository(string ConnectionString)
        {
            this.connectionString = ConnectionString;
        }

        public async Task<IEnumerable<Customer>> GetAllAsync()
        {
            using (var c = this.OpenConnection)
            {
                var cc = await c.QueryAsync<Customer>("SELECT Id, Name FROM Customers");
                return cc;
            }
        }
    }
}
