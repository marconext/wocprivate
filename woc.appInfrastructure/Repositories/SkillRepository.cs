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
    public class SkillRepository
    {
        private readonly string connectionString;

        public SkillRepository(string ConnectionString)
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

        public async Task<IEnumerable<Skill>> GetAllAsync()
        {
            using (var c = this.OpenConnection)
            {
                // geht var r = c.Query<Location>("SELECT Name FROM Location").Select(row => new Location((string)row.Name));
                // geht var r = c.Query<Location>("SELECT Name FROM Location").Select(row => new Location(row.Name));
                var pp = await c.QueryAsync<Skill>("SELECT Id, Name FROM Skills ORDER BY Name");
                return pp;
            }
        }
    }
}
