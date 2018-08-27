using System;

namespace woc.appInfrastructure.Dtos
{
    public class SystemInfoDto
    {
        public bool DbWorks {get; set;}
        public string DbCheckError {get; set;}
    }
}