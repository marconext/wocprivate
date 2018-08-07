using System;
using System.Data;
using System.Data.SqlClient;
using Dapper; // this extends idbconnection with .execute(), ...

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
    }
}