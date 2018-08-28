using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Transactions;
using Dapper; // this extends idbconnection with .execute(), ...
using woc.appDomain;
using woc.appInfrastructure.Dtos;

namespace woc.appInfrastructure.Repositories
{
    public class EmployeeRepository : BaseRepository
    {
        public EmployeeRepository(string ConnectionString)
        {
            connectionString = ConnectionString;
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

            sql.AppendLine("SELECT e.Id, e.Name, e.Email, ");
            sql.AppendLine("CONVERT(varchar(40),a.EmployeeId) + CONVERT(varchar(10),a.Year) + CONVERT(varchar(10),a.Month) as AID, ");
            sql.AppendLine("a.Year * 100 + a.Month as ACACL, a.Year, a.Month, a.Precentage, ");
            sql.AppendLine("r.Id, r.Name, ");
            sql.AppendLine("wp.Id, wp.Country, wp.City, wp.Name, ");
            sql.AppendLine("manager.Id, manager.Name ");
            sql.AppendLine("FROM Employees e");

            sql.AppendLine("LEFT OUTER JOIN EmployeeAvailabilities a on a.EmployeeId = e.Id AND ((a.Year * 100 + a.Month) BETWEEN @YearStart * 100 + @MonthStart AND @YearEnd * 100 + @MonthEnd)");
            sql.AppendLine("LEFT OUTER JOIN EmployeeRoles er on er.EmployeeId = e.Id ");
            sql.AppendLine("LEFT OUTER JOIN Roles r on r.Id = er.RoleId ");
            sql.AppendLine("LEFT OUTER JOIN WorkPlaces wp on wp.Id = e.WorkPlaceId ");
            sql.AppendLine("LEFT OUTER JOIN Employees manager on manager.Id = e.ManagerId ");
            sql.AppendLine("ORDER BY e.Name ");


            using (var c = this.OpenConnection)
            {
                var r = await c.QueryAsync<Employee, AvailabilityEntry, EmployeeRole, WorkPlace, Manager, Employee>(
                    sql.ToString(),
                    (employee, availability, employeeRole, workPlace, manager) =>
                    {
                        Employee employeeEntry = null;

                        if (!employeeDictionary.TryGetValue(employee.Id, out employeeEntry))
                        {
                            employeeEntry = employee;
                            employeeDictionary.Add(employeeEntry.Id, employeeEntry);
                        }

                        if (manager != null)
                        {
                            employee.SetManager(manager);
                        }

                        if (availability != null)
                        {
                            if (!employeeEntry.Availability.Any(a => a.Year == availability.Year && a.Month == availability.Month))
                            {
                                employeeEntry.AddAvailability(availability.Year, availability.Month, availability.Precentage);
                            }
                        }

                        if (employeeRole != null && !string.IsNullOrEmpty(employeeRole.Name))
                        {
                            if (!employeeEntry.Roles.Any(er => er.Name == employeeRole.Name))
                            {
                                employeeEntry.AddRole(employeeRole.Id, employeeRole.Name, null);
                            }
                        }

                        if (workPlace != null)
                        {
                            employeeEntry.SetWorkPlace(workPlace);
                        }

                        return employeeEntry;
                    },
                    splitOn: "AID, Id, Id, Id",
                    param: new
                    {
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
            int YearStart = DateTime.Now.Year;
            int MonthStart = DateTime.Now.Month;
            int YearEnd = DateTime.Now.AddMonths(5).Year;
            int MonthEnd = DateTime.Now.AddMonths(5).Month;
            var sql =
            @"
                select Id, Name, Email from Employees where Id = @Employeeid;
                select Id, Name, Maturity from EmployeeSkills es JOIN Skills s ON s.Id = es.SkillId where EmployeeId = @Employeeid;
                select Year, Month, Precentage, EmployeeId FROM EmployeeAvailabilities WHERE (Year * 100 + Month) BETWEEN (@YearStart * 100 + @MonthStart) AND (@YearEnd * 100 + @MonthEnd) AND EmployeeId = @Employeeid ORDER BY Year, Month;
                SELECT r.Id RoleId, r.Name RoleName, cg.Id ContributionGroupId, cg.Name ContributionGroupName  from EmployeeRoles er JOIN Roles r ON r.Id = er.RoleId JOIN ContributionGroups cg ON cg.Id = er.ContributionGroupId WHERE EmployeeId = @Employeeid;
                SELECT * FROM WorkPlaces WHERE Id = (SELECT WorkPlaceId FROM Employees WHERE Id = @Employeeid);
                SELECT Id, Name FROM Employees Managers WHERE Id = (SELECT ManagerId FROM Employees WHERE Id = @Employeeid);
            ";

            using (var c = this.OpenConnection)
            {
                var multi = await c.QueryMultipleAsync(sql, new
                {
                    EmployeeId = id,
                    YearStart = YearStart,
                    MonthStart = MonthStart,
                    YearEnd = YearEnd,
                    MonthEnd = MonthEnd
                });
                var emp = multi.Read<Employee>().FirstOrDefault();

                if (emp == null)
                {
                    return emp;
                }
                var empSkills = multi.Read<EmployeeSkill>().ToList();
                empSkills.ForEach(s =>
                {
                    emp.AddSkill(s.Id, s.Name, s.Maturity);
                });

                var empAvailability = multi.Read<AvailabilityEntryDto>().ToList();
                empAvailability.ForEach(a =>
                {
                    emp.AddAvailability(a.Year, a.Month, a.Precentage);
                });

                var empRoles = multi.Read<RoleContrinutionGroupHelperStruct>().ToList();
                empRoles.ForEach(r =>
                {
                    var cg = new ContributionGroup(r.ContributionGroupId, r.ContributionGroupName);
                    emp.AddRole(r.RoleId, r.RoleName, cg);
                });

                var empWorkPlace = multi.Read<WorkPlaceDto>().ToList();
                empWorkPlace.ForEach(wp =>
                {
                    var workPlace = new WorkPlace(wp.Id, wp.Country, wp.City, wp.Name);
                    emp.SetWorkPlace(workPlace);
                });

                var empManagers = multi.Read<ManagerDto>().ToList();
                empManagers.ForEach(m =>
                {
                    var manager = new Manager(m.Id, m.Name);
                    emp.SetManager(manager);
                });

                return emp;
            }
        }


        // Used to check if an employee already exists.
        // Name must match exactly.
        public async Task<Guid> GetIdByName(string Name)
        {
            Guid ret;
            using (var c = this.OpenConnection)
            {
                ret = await c.QuerySingleOrDefaultAsync<Guid>("SELECT Id FROM Employees WHERE Name = @Name", new { Name = Name });
            }
            return ret;
        }

        public async Task<bool> CheckNameExists(string Name)
        {
            int ret;
            using (var c = this.OpenConnection)
            {
                ret = await c.QuerySingleOrDefaultAsync<int>("SELECT COUNT(*) FROM Employees WHERE Name = @Name", new { Name = Name });
            }
            return ret > 0;
        }


        public void ListEmployeeSkills(Guid employeeId)
        {
            throw new NotImplementedException();
        }

        public async Task SaveEmployeeBaseProfileAsync(Employee employee)
        {
            if (employee.Id == Guid.Empty)
            {
                throw new InvalidConstraintException($"employee id of {employee.Id} is not allowed!");
            }
            using (var transaction = new TransactionScope())
            {
                using (var c = this.OpenConnection)
                {
                    Employee e = await this.GetById(employee.Id);
                    bool nameExists = await this.CheckNameExists(employee.Name);
                    if (nameExists)
                    {
                        throw new Exception("Name: " + employee.Name + "already exists.");
                    }

                    if (e == null)
                    {
                        // new entry
                        await c.ExecuteAsync("INSERT INTO Employees (Id, Name, Email) VALUES (@Id, @Name,  @Email)", employee);
                    }
                    else
                    {
                        // update entry
                        await c.ExecuteAsync("UPDATE Employees SET Id = @Id, Name = @Name, Email = @Email  WHERE ID = @Id", employee);
                    }
                }
            }
        }


        public async Task UpdateEmployeeAsync(Employee employee)
        {
            if (employee.Id == Guid.Empty)
            {
                throw new InvalidConstraintException($"employee id of {employee.Id} is not allowed!");
            }
            using (var c = this.OpenConnection)
            {
                var tran = c.BeginTransaction();
                try
                {

                    Employee originalEmployee = await this.GetById(employee.Id);

                    // 1. first we insert the record (if it is a new one), then we update it
                    if (originalEmployee == null)
                    {
                        // new entry
                        await c.ExecuteAsync("INSERT INTO Employees (Id, Name, Email) VALUES (@Id, @Name,  @Email)", employee, tran);
                    }

                    // 2. now, update
                    var par = new
                    {
                        Id = employee.Id,
                        Name = employee.Name,
                        Email = employee.Email,
                        ManagerId = employee.Manager.Id,
                        WorkPlaceId = employee.WorkPlace.Id
                    };
                    await c.ExecuteAsync(@"
                        UPDATE Employees 
                        SET 
                            Id = @Id,
                            Name = @Name,
                            Email = @Email,
                            ManagerId = @ManagerId,
                            WorkPlaceId = @WorkPlaceId
                        WHERE ID = @Id
                        ", par, 
                        tran
                    );

                    await this.SaveEmployeeSkills(c, employee.Id, employee.Skills, originalEmployee != null ? originalEmployee.Skills : new List<EmployeeSkill>(), tran);
                    await this.SaveEmployeeRoles(c, employee.Id, employee.Roles, originalEmployee != null ? originalEmployee.Roles : new List<EmployeeRole>(), tran);
                    tran.Commit();
                }
                catch(Exception ex)
                {
                    tran.Rollback();
                    throw ex;
                }
            }
        }

        public async Task DeleteEmployeesAsync(IList<Guid> EmployeeIds)
        {
            using (var c = this.OpenConnection)
            {
                var transaction = c.BeginTransaction();
                try
                {
                    await c.ExecuteAsync("DELETE EmployeeAvailabilities WHERE EmployeeId = @EmployeeId", EmployeeIds.Select(eid => new { EmployeeId = eid }), transaction);
                    await c.ExecuteAsync("DELETE EmployeeProjectRole WHERE EmployeeId = @EmployeeId", EmployeeIds.Select(eid => new { EmployeeId = eid }), transaction);
                    await c.ExecuteAsync("DELETE EmployeeRoles WHERE EmployeeId = @EmployeeId", EmployeeIds.Select(eid => new { EmployeeId = eid }), transaction);
                    await c.ExecuteAsync("DELETE EmployeeSkills WHERE EmployeeId = @EmployeeId", EmployeeIds.Select(eid => new { EmployeeId = eid }), transaction);
                    await c.ExecuteAsync("DELETE Employees WHERE Id = @EmployeeId", EmployeeIds.Select(eid => new { EmployeeId = eid }), transaction);
                    transaction.Commit();
                }
                catch (Exception ex)
                {
                    transaction.Rollback();
                    throw ex;
                }
            }
        }

        public async Task<bool> CanDeleteEmployeesAsync(IList<Guid> EmployeeIds)
        {
            bool ret = true;
            using (var c = this.OpenConnection)
            {
                Guid id = await c.QuerySingleOrDefaultAsync<Guid>("SELECT TOP 1 Id FROM Employees WHERE ManagerId IN @EmployeeIds", new {EmployeeIds = EmployeeIds});
                if(id != Guid.Empty)
                {
                    ret = false;
                }
            }
            return ret;
        }


        public async Task SaveEmployeeAvailabilityAsync(Guid EmployeeId, int Year, int Month, int Precentage)
        {
            using (var c = this.OpenConnection)
            {
                var param = new
                {
                    EmployeeId = EmployeeId,
                    Year = Year,
                    Month = Month,
                    Precentage = Precentage
                };

                await c.ExecuteAsync("DELETE EmployeeAvailabilities WHERE EmployeeId = @EmployeeId AND Year=@Year AND Month=@Month", param);

                StringBuilder sql = new StringBuilder();
                sql.Append("INSERT INTO EmployeeAvailabilities ");
                sql.Append("(EmployeeId, Year, Month, Precentage)");
                sql.Append("VALUES");
                sql.Append("(@EmployeeId, @Year, @Month, @Precentage)");

                await c.ExecuteAsync(sql.ToString(), param);
            }
        }

        private async Task SaveEmployeeSkills(IDbConnection conn, Guid EmployeeId, IList<EmployeeSkill> NewSkills, IList<EmployeeSkill> OrgSkills, IDbTransaction tran)
        {
            // delete the skills to delete
            IList<EmployeeSkill> skillsToDelete = this.getThingsToDelete(OrgSkills, NewSkills);
            await this.DeleteEmployeeSkills(conn, EmployeeId, skillsToDelete.Select(s => s.Id).ToList(), tran);

            // Insert the new skills
            IList<EmployeeSkill> skillsToInsert = this.getThingsToInsert(OrgSkills, NewSkills);
            await this.InsertEmployeeSkills(conn, EmployeeId, skillsToInsert, tran);
        }

        private async Task DeleteEmployeeSkills(IDbConnection conn, Guid EmployeeId, IList<Guid> SkillIds, IDbTransaction tran)
        {
            string sql = "DELETE FROM EmployeeSkills WHERE EmployeeId = @EmployeeId AND SkillId IN @SkillIds";
            await conn.ExecuteAsync(sql, new { EmployeeId = EmployeeId, SkillIds = SkillIds }, tran);
        }

        private async Task InsertEmployeeSkills(IDbConnection conn, Guid EmployeeId, IList<EmployeeSkill> Skills, IDbTransaction tran)
        {
            string sql = "INSERT INTO EmployeeSkills (EmployeeId, SkillId, Maturity) VALUES (@Id, @SkillId, @Maturity)";
            await conn.ExecuteAsync(sql, Skills.Select(s => new { Id = EmployeeId, SkillId = s.Id, Maturity = s.Maturity }), tran);
        }

        private async Task SaveEmployeeRoles(IDbConnection conn, Guid EmployeeId, IList<EmployeeRole> NewRoles, IList<EmployeeRole> OrgRoles, IDbTransaction tran)
        {
            // delete the roles to delete
            IList<EmployeeRole> rolesToDelete = this.getThingsToDelete(OrgRoles, NewRoles);
            await this.DeleteEmployeeRoles(conn, EmployeeId, rolesToDelete.Select(s => s.Id).ToList(), tran);

            // Insert the new roles
            IList<EmployeeRole> rolesToInsert = this.getThingsToInsert(OrgRoles, NewRoles);
            await this.InsertEmployeeRoles(conn, EmployeeId, rolesToInsert, tran);

            // Update the roles with changed ContributionGroup
            IList<EmployeeRole> rolesToUpdate = this.getRolesToUpdate(OrgRoles, NewRoles);
            // TODO: updata script
        }

        private IList<EmployeeRole> getRolesToUpdate(IList<EmployeeRole> orgRoles, IList<EmployeeRole> newRoles)
        {
            IList<EmployeeRole> rolesToUpdate = new List<EmployeeRole>();
            foreach (EmployeeRole r in orgRoles)
            {
                EmployeeRole o = newRoles.FirstOrDefault(ro => ro.Id == r.Id && ro.ContributionGroup.Id != r.ContributionGroup.Id);
                if (o != null)
                {
                    rolesToUpdate.Add(o);
                }
            }
            return rolesToUpdate;
        }

        private async Task UpdateEmployeeRoles(IDbConnection conn, Guid EmployeeId, IList<EmployeeRole> Roles, IDbTransaction tran)
        {
            string sql = "UPDATE EmployeeRoles SET ContributionGroupId = @ContributionGroupId WHERE EmployeeId = @EmployeeId AND RoleId = @RoleId";
            await conn.ExecuteAsync(sql, Roles.Select(r => new { EmployeeId = EmployeeId, RoleId = r.Id, ContributionGroupId = r.ContributionGroup.Id }), tran);
        }

        private async Task DeleteEmployeeRoles(IDbConnection conn, Guid EmployeeId, IList<Guid> RoleIds, IDbTransaction tran)
        {
            string sql = "DELETE FROM EmployeeRoles WHERE EmployeeId = @EmployeeId AND RoleId IN @RoleIds";
            await conn.ExecuteAsync(sql, new { EmployeeId = EmployeeId, RoleIds = RoleIds }, tran);
        }

        private async Task InsertEmployeeRoles(IDbConnection conn, Guid EmployeeId, IList<EmployeeRole> Roles, IDbTransaction tran)
        {
            List<RelationNMM> rels = new List<RelationNMM>();
            foreach (EmployeeRole role in Roles)
            {
                rels.Add(new RelationNMM(EmployeeId, role.Id, role.ContributionGroup.Id));
            }
            string sql = "INSERT INTO EmployeeRoles (EmployeeId, RoleId, ContributionGroupId) VALUES (@a, @b, @c)";
            await conn.ExecuteAsync(sql, rels.Select(r => new { a = r.a, b = r.b, c = r.c }), tran);
        }

        private class RoleContrinutionGroupHelperStruct
        {
            public Guid RoleId { get; set; }
            public string RoleName { get; set; }
            public Guid ContributionGroupId { get; set; }
            public string ContributionGroupName { get; set; }
        }
    }
}
