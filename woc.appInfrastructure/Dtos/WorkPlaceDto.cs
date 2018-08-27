using System;

namespace woc.appInfrastructure.Dtos
{
    public class WorkPlaceDto
    {
        public Guid Id {get; set;}
        public string Country {get;set;}
        public string City {get;set;}
        public string Name {get;set;}
    }
}