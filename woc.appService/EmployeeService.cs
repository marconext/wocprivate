using System;
using System.Collections.Generic;

using woc.appDomain;
using woc.appInfrastructure.Repositories;
using woc.appInfrastructure.Dtos;
using System.Threading.Tasks;

namespace woc.appService
{
    public class EmployeeService
    {
        private readonly EmployeeRepository employeeRepository;

        public EmployeeService(EmployeeRepository employeeRepository)
        {
            this.employeeRepository = employeeRepository;
        }

        public async Task<IList<EmployeeDto>> ListAllEmployeesAsync() {
            var el = await this.employeeRepository.GetAllAsync();
            IList<EmployeeDto> dtos = new List<EmployeeDto>();
            foreach(Employee e in el){
                var d = new EmployeeDto();
                d.Name = e.Name;
                d.Email = e.Email;
                dtos.Add(d);
            }
            return dtos;
        }
        public IList<EmployeeDto> ListAllEmployees() {
            var el = this.employeeRepository.GetAllAsync().Result;
            IList<EmployeeDto> dtos = new List<EmployeeDto>();
            foreach(Employee e in el){
                var d = new EmployeeDto();
                d.Name = e.Name;
                d.Email = e.Email;
                dtos.Add(d);
            }
            return dtos;
        }
        public IList<EmployeeDto> ListAllEmployeesFake() {
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
