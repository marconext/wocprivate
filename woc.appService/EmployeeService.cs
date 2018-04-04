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

        public EmployeeService(EmployeeRepository employeeRepository) {
            this.employeeRepository = employeeRepository;
        }

        public async Task<IList<EmployeeDto>> ListAllEmployeesAsync() {
            var el = await this.employeeRepository.GetAllAsync();
            IList<EmployeeDto> dtos = new List<EmployeeDto>();
            foreach(Employee e in el){
                var d = new EmployeeDto();
                d.Id = e.Id;
                d.Name = e.Name;
                d.Email = e.Email;
                dtos.Add(d);
            }
            return dtos;
        }

        public async Task<EmployeeDto> GetEmplyeeByIdAsync(Guid Id) {
            EmployeeDto res = new EmployeeDto();
            var e = await this.employeeRepository.GetById(Id);
            res.Name = e.Name;
            res.Email = e.Email;
            foreach(EmployeeSkill es in e.Skills)
            {
                res.Skills.Add(new EmployeeSkillDto() { Name = es.Name, Maturity = es.Maturity} );
            }
            return res;
        }

        public async Task SaveEmployeeBasProfileAsync(Guid id, string name, string email) {
            Employee e = await this.employeeRepository.GetById(id);
            if(e == null){
                e = new Employee(null, name, email);
            }
            
            e.SetBaseProfile(name, email);
            await this.employeeRepository.SaveEmployeeBaseProfileAsync(e);
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

        public IList<EmployeeSkillDto> ListEmployeeSkills(Guid EmployeeId) {
            this.employeeRepository.ListEmployeeSkills(EmployeeId);
            return null;

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
