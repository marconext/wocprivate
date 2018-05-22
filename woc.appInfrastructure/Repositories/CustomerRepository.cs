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
    public class CustomerRepository
    {
        private readonly string connectionString;

        public CustomerRepository(string ConnectionString)
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
