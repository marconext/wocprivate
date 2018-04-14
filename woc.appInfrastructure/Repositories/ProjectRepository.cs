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
                var pp = await c.QueryAsync<Project>("SELECT Id, Name FROM Projects");
                return pp;
            }
        }

        public async Task<IEnumerable<Project>> GetChildsByFilter__(ProjectFilter filter) // returns nur basic porject info
        {
            StringBuilder sqlProjects = new StringBuilder();
            sqlProjects.AppendLine(@"SELECT DISTINCT p.id, p.name FROM Projects p");
            
            if(filter.RegionKeyNames.Count > 0)
            {
                sqlProjects.AppendLine("JOIN ProjectRegions pr on pr.ProjectId = p.Id");
                sqlProjects.AppendLine("JOIN Regions r on r.Id = pr.RegionId AND r.KeyNamePath LIKE @RegionKeyNamePath");
            }
            
            if(filter.OfferingKeyNames.Count > 0)
            {
                sqlProjects.AppendLine("JOIN ProjectOfferings po on po.ProjectId = p.Id");
                sqlProjects.AppendLine("JOIN Offerings o on o.Id = po.OfferingId AND o.KeyNamePath LIKE @OfferingKeyNamePath");
            }

            using (var c = this.OpenConnection)
            {
                string regionKeyNamePath = filter.RegionKeyNames.Count > 0 ? filter.RegionKeyNames[0] : ";"; // todo: change to multi search 
                string offeringKeyNamePath = filter.OfferingKeyNames.Count > 0 ? filter.OfferingKeyNames[0] : ";"; // todo: change to multi search 
                var pp = await c.QueryAsync<Project>(sqlProjects.ToString(), new { RegionKeyNamePath = regionKeyNamePath + "%" ,  OfferingKeyNamePath = offeringKeyNamePath + "%" } );
                return pp;
            }
        }
        public async Task<IEnumerable<Project>> GetChildsByFilter(ProjectFilter filter)
        {
            StringBuilder sqlProjects = new StringBuilder();
            sqlProjects.AppendLine(@"SELECT DISTINCT p.id, p.name, r.Id, r.Name, r.KeyNamePath, o.Id, o.Name, o.KeyNamePath FROM Projects p");

            sqlProjects.AppendLine("LEFT OUTER JOIN ProjectRegions pr on pr.ProjectId = p.Id");
            sqlProjects.AppendLine("LEFT OUTER JOIN Regions r on r.Id = pr.RegionId");
            
            sqlProjects.AppendLine("LEFT OUTER JOIN ProjectOfferings po on po.ProjectId = p.Id");
            sqlProjects.AppendLine("LEFT OUTER JOIN Offerings o on o.Id = po.OfferingId");


            sqlProjects.AppendLine("WHERE 1=1");
           
            if(filter.RegionKeyNames.Count > 0)
            {
                sqlProjects.AppendLine("AND r.KeyNamePath LIKE @RegionKeyNamePath");
            }
            if(filter.OfferingKeyNames.Count > 0)
            {
                 sqlProjects.AppendLine("AND o.KeyNamePath LIKE @OfferingKeyNamePath");
            }

            using (var c = this.OpenConnection)
            {
                string regionKeyNamePath = filter.RegionKeyNames.Count > 0 ? filter.RegionKeyNames[0] : ";"; // todo: change to multi search 
                string offeringKeyNamePath = filter.OfferingKeyNames.Count > 0 ? filter.OfferingKeyNames[0] : ";"; // todo: change to multi search 

                var projectDictionary = new Dictionary<Guid, Project>();
    
                var list = await c.QueryAsync<Project, Region, Offering, Project>(
                sqlProjects.ToString(),
                (project, region, offering) =>
                {
                    Project projectEntry;
                
                    if (!projectDictionary.TryGetValue(project.Id, out projectEntry))
                    {
                        projectEntry = project;
                        // projectEntry.Regions = new List<Region>(); nicht nötig
                        projectDictionary.Add(projectEntry.Id, projectEntry);
                    }

                    if(region != null)
                    {
                        projectEntry.AddRegion(region);
                    }
                                   
                    if(offering != null)
                    {
                        projectEntry.AddOffering(offering);
                    }

                    return projectEntry;
                },
                param: new { RegionKeyNamePath = regionKeyNamePath + "%" ,  OfferingKeyNamePath = offeringKeyNamePath + "%" }
                );
                //.Distinct()
                //.ToList();

                var items = projectDictionary.Values.ToList();
                return items;
  
                //return list;
            }
        }



        public async Task<IEnumerable<Project>> GetProjectChildsByParentRegionKeyNamePath(string keyNamePath) 
        {
            using (var c = this.OpenConnection)
            {
                string sql = @"
                SELECT p.id, p.name FROM ProjectRegions pr
                JOIN Projects p ON p.Id = pr.ProjectId
                JOIN Regions r ON r.Id = pr.RegionId
                WHERE r.KeyNamePath LIKE @keyNamePath
                ";
                var pp = await c.QueryAsync<Project>(sql, new { keyNamePath = keyNamePath + "%" } );
                return pp;
            }
        }

        public async Task<IEnumerable<Region>> GetProjectChildRegionsByKeyNamePath(string keyNamePath)
        {
            using (var c = this.OpenConnection)
            {
                string sqlProjects = @"
                SELECT DISTINCT r.Id, r.Name, r.KeyNamePath FROM ProjectRegions pr
                JOIN Projects p ON p.Id = pr.ProjectId
                JOIN Regions r ON r.Id = pr.RegionId
                WHERE r.KeyNamePath LIKE @keyNamePath
                ";
                var rr = await c.QueryAsync<Region>(sqlProjects, new { keyNamePath = keyNamePath + ";%" }); // add ; from child node, to indicate the parent has childs
                return rr;
            }
        }

        public async Task<IEnumerable<Offering>> GetProjectChildOfferingsByKeyNamePath(string keyNamePath)
        {
            using (var c = this.OpenConnection)
            {
                string sqlProjects = @"
                SELECT DISTINCT r.Id, r.Name, r.KeyNamePath FROM ProjectOfferings po
                JOIN Projects p ON p.Id = po.ProjectId
                JOIN Offerings r ON r.Id = po.OfferingId
                WHERE r.KeyNamePath LIKE @keyNamePath
                ";
                var rr = await c.QueryAsync<Offering>(sqlProjects, new { keyNamePath = keyNamePath + ";%" }); // add ; from child node, to indicate the parent has childs
                return rr;
            }
        }

        public async Task<Project> GetById(Guid id)
        {
            var sql =
            @"
                select Id, Name from Projects where Id = @ProjectId;
                select Id, Name, KeyNamePath from ProjectRegions pr JOIN Regions r ON r.Id = pr.RegionId where ProjectId = @ProjectId;
                select Id, Name, KeyNamePath from ProjectOfferings po JOIN Offerings o ON o.Id = po.OfferingId where ProjectId = @ProjectId;
            ";

            using (var c = this.OpenConnection)
            {
                var multi = await c.QueryMultipleAsync(sql, new { ProjectId = id });
                var proj = multi.Read<Project>().FirstOrDefault();
                var regions = multi.Read<Region>().ToList();
                var offerings = multi.Read<Offering>().ToList();

                if(proj == null)
                {
                    return proj;
                }

                regions.ForEach(r =>
                {
                    proj.AddRegion(new Region(r.Id, r.Name, r.KeyNamePath));
                });

                offerings.ForEach(o =>
                {
                    proj.AddOffering(new Offering(o.Id, o.Name, o.KeyNamePath));
                });

                return proj;
            }
        }

        public async Task SaveProjectBaseAsync(Project Project)
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
