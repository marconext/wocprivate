using System;
using System.Collections.Generic;
using woc.appdomain;
using woc.appInfrastructure.Dtos;

namespace woc.appService
{
    public class EmployeeService
    {
        public EmployeeService()
        {
            
        }

        public IList<EmployeeDto> ListAllEmployees() {
            return this.fakeData();
        }

        private IList<EmployeeDto> fakeData() {
            IList<EmployeeDto> ret = new List<EmployeeDto>();
            for(int i=0; i< 20; i ++){
                ret.Add(new EmployeeDto() { Name = "Empl" + i.ToString(), Email = string.Format("empl{0}@company.com", i.ToString()) }  ) ;
            }
            return ret;
        }
    }
}
