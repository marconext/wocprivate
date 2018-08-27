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
    public class WorkPlaceRepository: BaseRepository
    {
        public WorkPlaceRepository(string ConnectionString)
        {
            connectionString = ConnectionString;
        }

        public async Task<IEnumerable<WorkPlace>> GetAllAsync()
        {
            using (var c = this.OpenConnection)
            {
                var wps = await c.QueryAsync<WorkPlace>("SELECT Id, Country, City, Name FROM WorkPlaces ORDER BY Name");
                return wps;
            }
        }

 
        public async Task<IEnumerable<string>> GetCountries()
        {
            using (var c = this.OpenConnection)
            {
                var pp = await c.QueryAsync<string>("SELECT Distinct Country FROM WorkPlaces ORDER BY Country");
                return pp;
            }
        }
        public async Task<IEnumerable<string>> GetCitiesByCountry(string Country)
        {
            using (var c = this.OpenConnection)
            {
                var pp = await c.QueryAsync<string>(
                    "SELECT Distinct City FROM WorkPlaces WHERE Country = @Country ORDER BY City",
                    new { Country = Country}
                    );
                return pp;
            }
        }

        public async Task<IEnumerable<string>> GetWorkplacesByCountryCity(string Country, string City)
        {
            using (var c = this.OpenConnection)
            {
                var pp = await c.QueryAsync<string>(
                    "SELECT Distinct Name FROM WorkPlaces WHERE Country = @Country AND City = @City ORDER BY Name",
                    new { Country = Country, City = City}
                    );
                return pp;
            }
        }

        public async Task<WorkPlace> GetWorkplaceByCountryCityWorkPlace(string Country, string City, string WorkPlaceName)
        {
            using (var c = this.OpenConnection)
            {
                var pp = await c.QuerySingleAsync<WorkPlace>(
                    "SELECT Id, Country, City, Name FROM WorkPlaces WHERE Country = @Country AND City = @City AND Name = @Name ORDER BY Name",
                    new { 
                        Country = Country,
                        City = City,
                        Name = WorkPlaceName
                        }
                    );
                return pp;
            }
        }

        public async Task<WorkPlace> SaveAsync(WorkPlace WorkPlace)
        {
            throw new NotImplementedException("WorkPlace.SaveAsync");
        }
    }
}
