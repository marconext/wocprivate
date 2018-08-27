using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using Dapper; // this extends idbconnection with .execute(), ...
using woc.appDomain;

namespace woc.appInfrastructure.Repositories
{
    public abstract class BaseRepository
    {
        protected string connectionString;

        protected IDbConnection OpenConnection
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
                    throw;
                }

                return sqlConnection;
            }
        }

        protected IList<T> getThingsToDelete<T>(IList<T> OrgThings, IList<T> NewThings) where T : IEntityBase
        {
            return this.missingThingsInB<T>(OrgThings, NewThings);
        }

        protected IList<T> getThingsToInsert<T>(IList<T> OrgThings, IList<T> NewThings) where T : IEntityBase
        {
            return this.missingThingsInB<T>(NewThings, OrgThings);
        }


        protected IList<T> missingThingsInB<T>(IList<T> ThingsInQuestion, IList<T> BThings) where T : IEntityBase
        {
            IList<T> missingThings = new List<T>();
            foreach (T t in ThingsInQuestion)
            {
                var o = BThings.FirstOrDefault(bThing => bThing.Id == t.Id);
                if (o == null)
                {
                    missingThings.Add(t);
                }
            }
            return missingThings;
        }

        public class RelationNM
        {
            public RelationNM(Guid a, Guid b)
            {
                this.a = a;
                this.b = b;
            }
            public Guid a;
            public Guid b;
        }

        public class RelationNMM
        {
            public RelationNMM(Guid a, Guid b, Guid c)
            {
                this.a = a;
                this.b = b;
                this.c = c;
            }
            public Guid a;
            public Guid b;
            public Guid c;
        }

    }
}