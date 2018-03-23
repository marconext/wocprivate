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
    public class EmployeeRepository
    {
        private readonly string connectionString;

        public EmployeeRepository(string ConnectionString)
        {
            connectionString = ConnectionString;
        }
        public IDbConnection OpenConnection
        {
            get
            {
                var sqlConnection = new SqlConnection(connectionString);
                try {
                    sqlConnection.Open();
                }
                catch(Exception ex) {
                    string s = ex.Message;
                }
                
                return sqlConnection;
            }
        }

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            using(var c = this.OpenConnection){
                // geht var r = c.Query<Employee>("SELECT Name FROM Employee").Select(row => new Employee((string)row.Name));
                // geht var r = c.Query<Employee>("SELECT Name FROM Employee").Select(row => new Employee(row.Name));
                var r = await c.QueryAsync<Employee>("SELECT Name FROM Employee");
                return r;
            }
        }
    }
}