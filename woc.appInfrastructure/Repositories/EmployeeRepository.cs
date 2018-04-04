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
                var r = await c.QueryAsync<Employee>("SELECT Id, Name, Email FROM Employees");
                return r;
            }
        }

        public async Task<Employee> GetById(Guid id)
        {
            var sql =
            @"
                select Id, Name, Email from Employees where Id = @Employeeid;
                select Name, Maturity from EmployeeSkills es JOIN Skills s ON s.Id = es.SkillId where EmployeeId = @Employeeid;
            ";

            using (var c = this.OpenConnection)
            {
                var multi = await c.QueryMultipleAsync(sql, new { EmployeeId = id });
                var emp = multi.Read<Employee>().FirstOrDefault();
                if(emp == null)
                {
                    return emp;
                }
                var empSkills = multi.Read<EmployeeSkill>().ToList();

                empSkills.ForEach(s =>
                {
                    emp.AddSkill(s.Name, s.Maturity);
                });
                return emp;
            }
        }

        public void ListEmployeeSkills(Guid employeeId)
        {
            throw new NotImplementedException();
        }

        public async Task SaveEmployeeBaseProfileAsync(Employee employee)
        {
            if(employee.Id == Guid.Empty) {
                throw new InvalidConstraintException($"employee id of {employee.Id} is not allowed!");
            }
            using (var c = this.OpenConnection) {
                Employee e = await this.GetById(employee.Id);

                if(e == null) { 
                    // new entry
                    await c.ExecuteAsync("INSERT INTO Employees (Id, Name, Email) VALUES (@Id, @Name,  @Email)", employee);
                } else {
                    // update entry
                    await c.ExecuteAsync("UPDATE Employees SET Id = @Id, Name = @Name, Email = @Email  WHERE ID = @Id", employee);
                }
            }
        }
    }
}
