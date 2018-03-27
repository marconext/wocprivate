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

        public async Task<IEnumerable<Employee>> GetAllAsync()
        {
            using (var c = this.OpenConnection)
            {
                // geht var r = c.Query<Employee>("SELECT Name FROM Employee").Select(row => new Employee((string)row.Name));
                // geht var r = c.Query<Employee>("SELECT Name FROM Employee").Select(row => new Employee(row.Name));
                var r = await c.QueryAsync<Employee>("SELECT Name FROM Employee");
                return r;
            }
        }

        public async Task<Employee> GetById(Guid id)
        {
            var sql =
            @"
                select Id, Name from Employee where Id = @Employeeid;
                select Name, Maturity from EmployeeSkill es JOIN Skill s ON s.Id = es.SkillId where EmployeeId = @Employeeid;
            ";

            using (var c = this.OpenConnection)
            {
                var multi = await c.QueryMultipleAsync(sql, new { EmployeeId = id });
                var emp = multi.Read<Employee>().Single();
                var empSkills = multi.Read<EmployeeSkill>().ToList();

                empSkills.ForEach(s =>
                {
                    emp.AddSkill(s.Name, s.Maturity);
                });
                return emp;
            }
        }
    }
}
