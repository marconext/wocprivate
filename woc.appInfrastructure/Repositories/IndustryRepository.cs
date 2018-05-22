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
    public class IndustryRepository
    {
        private readonly string connectionString;

        public IndustryRepository(string ConnectionString)
        {
            connectionString = ConnectionString;
        }
        public IDbConnection OpenConnection
        {
            get
            {
                var sqlConnection = new SqlConnection(connectionString);
                try
                {
                    sqlConnection.Open();
                }
                catch (Exception ex)
                {
                    string s = ex.Message;
                }

                return sqlConnection;
            }
        }

        public async Task<IEnumerable<Industry>> GetAllAsync()
        {
            using (var c = this.OpenConnection)
            {
                var ii = await c.QueryAsync<Industry>("SELECT Id, Name FROM Industries");
                return ii;
            }
        }
    }
}
