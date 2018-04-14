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
    public class OfferingRepository
    {
        private readonly string connectionString;

        public OfferingRepository(string ConnectionString)
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

        public async Task<IEnumerable<Offering>> GetAllAsync()
        {
            using (var c = this.OpenConnection)
            {
                var oo = await c.QueryAsync<Offering>("SELECT Id, Name, KeyNamePath FROM Offerings");
                return oo;
            }
        }

    }
}
