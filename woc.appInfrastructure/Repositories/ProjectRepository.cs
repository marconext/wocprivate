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
    public class ProjectRepository
    {
        private readonly string connectionString;

        public ProjectRepository(string ConnectionString)
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

        public async Task<IEnumerable<Project>> GetAllAsync()
        {
            using (var c = this.OpenConnection)
            {
                // geht var r = c.Query<Project>("SELECT Name FROM Project").Select(row => new Project((string)row.Name));
                // geht var r = c.Query<Project>("SELECT Name FROM Project").Select(row => new Project(row.Name));
                var r = await c.QueryAsync<Project>("SELECT Id, Name FROM Projects");
                return r;
            }
        }

        public async Task<IEnumerable<Project>> GetByLocationParentKeyNamePath(string keyNamePath)
        {
            using (var c = this.OpenConnection)
            {
                string sqlProjects = @"
                SELECT p.Id, p.Name FROM ProjectRegions pr
                JOIN Projects p ON p.Id = pr.ProjectId
                JOIN Regions r ON r.Id = pr.RegionId
                WHERE r.KeyNamePath IN ( ';NA') 
                ";
                var pp = await c.QueryAsync<Project>(sqlProjects);
                return pp;
            }
        }

        public async Task<IEnumerable<Region>> GetProjectChildRegionsByKeyNamePaths(string keyNamePath)
        {
            using (var c = this.OpenConnection)
            {
                string sqlProjects = @"
                SELECT DISTINCT r.Id, r.Name, r.KeyNamePath FROM ProjectRegions pr
                JOIN Projects p ON p.Id = pr.ProjectId
                JOIN Regions r ON r.Id = pr.RegionId
                WHERE r.KeyNamePath LIKE @keyNamePath
                ";
                var rr = await c.QueryAsync<Region>(sqlProjects, new { keyNamePath = keyNamePath + "%" });
                return rr;
            }
        }

        public async Task<Project> GetById(Guid id)
        {
            var sql =
            @"
                select Id, Name from Projects where Id = @ProjectId;
                select Id, Name, KeyNamePath from ProjectRegions pr JOIN Regions r ON r.Id = pr.RegionId where ProjectId = @ProjectId;
            ";

            using (var c = this.OpenConnection)
            {
                var multi = await c.QueryMultipleAsync(sql, new { ProjectId = id });
                var proj = multi.Read<Project>().FirstOrDefault();
                if(proj == null)
                {
                    return proj;
                }
                var regions = multi.Read<Region>().ToList();

                regions.ForEach(r =>
                {
                    proj.AddRegion(new Region(r.Id, r.Name, r.KeyNamePath));
                });
                return proj;
            }
        }

        public void ListProjectSkills(Guid ProjectId)
        {
            throw new NotImplementedException();
        }

        public async Task SaveProjectBaseProfileAsync(Project Project)
        {
            if(Project.Id == Guid.Empty) {
                throw new InvalidConstraintException($"Project id of {Project.Id} is not allowed!");
            }
            using (var c = this.OpenConnection) {
                Project e = await this.GetById(Project.Id);

                if(e == null) { 
                    // new entry
                    await c.ExecuteAsync("INSERT INTO Projects (Id, Name, Email) VALUES (@Id, @Name,  @Email)", Project);
                } else {
                    // update entry
                    await c.ExecuteAsync("UPDATE Projects SET Id = @Id, Name = @Name, Email = @Email  WHERE ID = @Id", Project);
                }
            }
        }
    }
}
