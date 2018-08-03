using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
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

        public async Task<IEnumerable<Employee>> GetByFilterAsync()
        {
            int yearStart, monthStart, yearEnd, monthEnd;
            yearStart = DateTime.Now.Year;
            monthStart = DateTime.Now.Month;
            yearEnd = DateTime.Now.AddMonths(5).Year;
            monthEnd = DateTime.Now.AddMonths(5).Month;

            var employeeDictionary = new Dictionary<Guid, Employee>();

            StringBuilder sql = new StringBuilder();
            // sql.AppendLine("SELECT e.Id, e.Name, e.Email, CONVERT(varchar(40),a.EmployeeId) + CONVERT(varchar(10),a.Year) + CONVERT(varchar(10),a.Month) as AID, a.Year, a.Month, a.Precentage FROM Employees e");
            // sql.AppendLine("LEFT OUTER JOIN EmployeeAvailabilities a on a.EmployeeId = e.Id AND (a.Year BETWEEN @YearStart AND @YearEnd) AND (a.Month BETWEEN @MonthStart AND @MonthEnd)");

            sql.AppendLine("SELECT e.Id, e.Name, e.Email, CONVERT(varchar(40),a.EmployeeId) + CONVERT(varchar(10),a.Year) + CONVERT(varchar(10),a.Month) as AID, a.Year * 100 + a.Month as ACACL, a.Year, a.Month, a.Precentage FROM Employees e");
            sql.AppendLine("LEFT OUTER JOIN EmployeeAvailabilities a on a.EmployeeId = e.Id AND ((a.Year * 100 + a.Month) BETWEEN @YearStart * 100 + @MonthStart AND @YearEnd * 100 + @MonthEnd)");


            using (var c = this.OpenConnection)
            {
                var r = await c.QueryAsync<Employee, AvailabilityEntry ,Employee>(
                    sql.ToString(),
                    (employee, availability) =>
                    {
                        Employee employeeEntry = null;

                        if (!employeeDictionary.TryGetValue(employee.Id, out employeeEntry)){
                            employeeEntry = employee;
                            employeeDictionary.Add(employeeEntry.Id, employeeEntry);
                        }

                        if (availability != null)
                        {
                            if (!employeeEntry.Availability.Any(a => a.Year == availability.Year && a.Month == availability.Month))
                            {
                                employeeEntry.AddAvailability(availability.Year, availability.Month, availability.Precentage);
                            }
                        }
                        return employeeEntry;
                    },
                    splitOn: "AID",
                    param: new {
                        YearStart = yearStart,
                        MonthStart = monthStart,
                        YearEnd = yearEnd,
                        MonthEnd = monthEnd
                    }
                );
                var items = employeeDictionary.Values.ToList();
                return items;
            }
        }

        public async Task<Employee> GetById(Guid id)
        {
            int YearFrom = DateTime.Now.Year;
            int MonthFrom = DateTime.Now.Month;
            int YearTo = DateTime.Now.AddMonths(5).Year;
            int MonthTo = DateTime.Now.AddMonths(5).Month;
            var sql =
            @"
                select Id, Name, Email from Employees where Id = @Employeeid;
                select Name, Maturity from EmployeeSkills es JOIN Skills s ON s.Id = es.SkillId where EmployeeId = @Employeeid;
                select Year, Month, Precentage, EmployeeId FROM EmployeeAvailabilities WHERE (Year BETWEEN @YearFrom AND @YearTo AND Month BETWEEN @MonthFrom AND @MonthTo) AND EmployeeId = @Employeeid;
            ";

            using (var c = this.OpenConnection)
            {
                var multi = await c.QueryMultipleAsync(sql, new { 
                    EmployeeId = id,
                    YearFrom = YearFrom,
                    MonthFrom = MonthFrom,
                    YearTo = YearTo,
                    MonthTo = MonthTo                    
                    });
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

                var empAvailability = multi.Read<AvailabilityEntryDto>().ToList();
                empAvailability.ForEach(a => {
                    emp.AddAvailability(a.Year, a.Month, a.Precentage);
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
