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
    public class ManagerRepository : BaseRepository
    {
        public ManagerRepository(string ConnectionString)
        {
            connectionString = ConnectionString;
        }

        public async Task<Manager> GetById(Guid Id)
        {
            string sql = @"SELECT e.Id, e.Name FROM Employees e WHERE Id = @Id";

            using (var c = this.OpenConnection)
            {
                var r = await c.QueryFirstOrDefaultAsync<Manager>(sql, new {Id = Id});
                return r;
            }
        }

        public async Task<IEnumerable<Manager>> FindManagersAsync(string SearchText)
        {
            SearchText = SearchText + "%";
            string sql = @"
                SELECT e.Id, e.Name FROM Employees e
                JOIN EmployeeRoles er ON er.EmployeeId = e.Id
                JOIN Roles r ON r.Id = er.RoleId and r.Name = 'Manager'
                WHERE e.Name LIKE @SearchText
                ORDER BY e.Name
            ";
            using (var c = this.OpenConnection)
            {
                var rr = await c.QueryAsync<Manager>(sql, new {SearchText = SearchText});
                return rr;
            }
        }
    }
}
