using System;
using System.Collections.Generic;
using System.Linq;
using woc.appDomain;
using woc.appInfrastructure.Repositories;
using woc.appInfrastructure.Dtos;
using System.Threading.Tasks;

namespace woc.appService
{
    public class EmployeeService
    {
        private readonly EmployeeRepository employeeRepository;
        private readonly ManagerRepository managerRepository;

        public EmployeeService(EmployeeRepository employeeRepository, ManagerRepository managerRepository)
        {
            this.employeeRepository = employeeRepository;
            this.managerRepository =  managerRepository;
        }

        public async Task<IList<EmployeeDto>> ListAllEmployeesAsync()
        {
            //var el = await this.employeeRepository.GetAllAsync();
            var el = await this.employeeRepository.GetByFilterAsync();
            IList<EmployeeDto> dtos = new List<EmployeeDto>();
            foreach (Employee e in el)
            {
                var d = new EmployeeDto();
                d.Id = e.Id;
                d.Name = e.Name;
                d.Email = e.Email;

                if (e.Manager != null)
                {
                    d.Manager = new ManagerDto { Id = e.Manager.Id, Name = e.Manager.Name };
                }

                // make 6 entiries
                // so we have for sure something to show.
                // DateTime dt = DateTime.Now;
                // for(int i = 0; i<6; i++) {
                //     int year = dt.AddMonths(i).Year;
                //     int month = dt.AddMonths(i).Month;
                //     d.Availability.Add(new AvailabilityEntryDto() {Year = year, Month = month, Precentage = 0});
                // }
                d.Availability = Make6entiries(DateTime.Now);

                // update the entries which exist in db
                foreach (AvailabilityEntry a in e.Availability)
                {
                    AvailabilityEntryDto entry = d.Availability.ToList().Find(i => i.Year == a.Year && i.Month == a.Month);
                    if (entry != null)
                    {
                        entry.Precentage = a.Precentage;
                    }
                }

                foreach (EmployeeRole r in e.Roles)
                {
                    d.Roles.Add(new EmployeeRoleDto() { Name = r.Name, ContributionGroup = null });
                }

                if (e.WorkPlace != null)
                {
                    d.WorkPlace = new WorkPlaceDto();
                    d.WorkPlace.Id = e.WorkPlace.Id;
                    d.WorkPlace.Country = e.WorkPlace.Country;
                    d.WorkPlace.City = e.WorkPlace.City;
                    d.WorkPlace.Name = e.WorkPlace.Name;
                }

                dtos.Add(d);
            }
            return dtos;
        }

        public async Task<EmployeeDto> GetEmplyeeByIdAsync(Guid Id)
        {
            EmployeeDto res = new EmployeeDto();
            var e = await this.employeeRepository.GetById(Id);
            res.Id = e.Id;
            res.Name = e.Name;
            res.Email = e.Email;
            foreach (EmployeeSkill es in e.Skills)
            {
                res.Skills.Add(new EmployeeSkillDto() { Id = es.Id, Name = es.Name, Maturity = (int)es.Maturity });
            }

            // foreach(AvailabilityEntry a in e.Availability)
            // {
            //     res.Availability.Add(new AvailabilityEntryDto() { Year = a.Year, Month = a.Month, Precentage = a.Precentage} );
            // }

            res.Availability = Make6entiries(DateTime.Now);
            // update the entries which exist in db
            foreach (AvailabilityEntry a in e.Availability)
            {
                AvailabilityEntryDto entry = res.Availability.ToList().Find(i => i.Year == a.Year && i.Month == a.Month);
                if (entry != null)
                {
                    entry.Precentage = a.Precentage;
                }
            }

            foreach (EmployeeRole r in e.Roles)
            {
                var cg = new ContributionGroupDto();
                cg.Id = r.ContributionGroup.Id;
                cg.Name = r.ContributionGroup.Name;

                res.Roles.Add(new EmployeeRoleDto() { RoleId = r.Id, Name = r.Name, ContributionGroup = cg });
            }

            if (e.WorkPlace != null)
            {
                res.WorkPlace = new WorkPlaceDto();
                res.WorkPlace.Id = e.WorkPlace.Id;
                res.WorkPlace.Country = e.WorkPlace.Country;
                res.WorkPlace.City = e.WorkPlace.City;
                res.WorkPlace.Name = e.WorkPlace.Name;
            }

            if (e.Manager != null)
            {
                res.Manager = new ManagerDto() { Id = e.Manager.Id, Name = e.Manager.Name };
            }

            return res;
        }


        public async Task SaveEmployeeBasProfileAsync(Guid id, string name, string email)
        {
            Employee e = await this.employeeRepository.GetById(id);
            if (e == null)
            {
                e = new Employee(null, name, email);
            }

            e.SetBaseProfile(name, email);
            await this.employeeRepository.SaveEmployeeBaseProfileAsync(e);
        }

        public async Task<ServiceResponse> SaveEmployeeAsync(EmployeeDto EmployeeDto)
        {
            ServiceResponse ret = new ServiceResponse();

            Guid newId = Guid.Empty;

            try
            {
                if (EmployeeDto.Id == Guid.Empty)
                {
                    newId = Guid.NewGuid();
                    EmployeeDto.Id = newId;
                }

                Guid existing_id = await this.employeeRepository.GetIdByName(EmployeeDto.Name);

                // TODO: check everything
                // if new record and name already exists
                if (existing_id != Guid.Empty && existing_id != EmployeeDto.Id)
                {
                    ret.AddError(new ServiceResponseItem("EmployeeName", $"Employe with name: {EmployeeDto.Name} already exists."));
                }

                // WorkPlace
                if (EmployeeDto.WorkPlace.Id == Guid.Empty)
                {
                    ret.AddError(new ServiceResponseItem("WorkPlace", $"Workplace must be defined"));
                }

                // check Manager

                if (EmployeeDto.Manager != null && EmployeeDto.Manager.Id == Guid.Empty)
                {
                    ret.AddError(new ServiceResponseItem("Manager", $"Manager must be defined"));
                }

                if (EmployeeDto.Manager == null)
                {
                    ret.AddError(new ServiceResponseItem("Manager", $"Manager must be defined"));
                }

                if (EmployeeDto.Manager != null)
                {
                    Manager manager = await this.managerRepository.GetById(EmployeeDto.Manager.Id);
                    if (manager == null) {
                        ret.AddError(new ServiceResponseItem("Manager", $"Invalid Manager specified!"));
                    }
                }
               

                // other checks goes here


                // if any errors, return
                if (ret.HasErrors())
                {
                    return ret.Get();
                }

                // 

                // compose new empoyee
                Employee employee = new Employee(EmployeeDto.Id, EmployeeDto.Name, EmployeeDto.Email);
                if (EmployeeDto.WorkPlace != null)
                {
                    WorkPlaceDto wpDto = EmployeeDto.WorkPlace;
                    WorkPlace wp = new WorkPlace(wpDto.Id, wpDto.Country, wpDto.City, wpDto.Name);
                    employee.SetWorkPlace(wp);
                }

                if (EmployeeDto.Manager != null)
                {
                    ManagerDto mDto = EmployeeDto.Manager;
                    employee.SetManager(new Manager(mDto.Id, mDto.Name));
                }

                foreach (EmployeeSkillDto sdto in EmployeeDto.Skills)
                {
                    employee.AddSkill(sdto.Id, sdto.Name, MaturityEnum.High);
                }

                foreach (EmployeeRoleDto rdto in EmployeeDto.Roles)
                {
                    ContributionGroup cg = new ContributionGroup(rdto.ContributionGroup.Id, rdto.ContributionGroup.Name);
                    employee.AddRole(rdto.RoleId, rdto.Name, cg);
                }

                await this.employeeRepository.UpdateEmployeeAsync(employee);
            }
            catch (Exception ex)
            {
                ret.SetErrorMessage("Error while saving an employee occured : " + ex.Message);
            }
            return ret.Get();
        }

        public async Task<ServiceResponse> DeleteEmployeesAsync(IList<Guid> EmployeeIds)
        {
            ServiceResponse ret = new ServiceResponse();

            if(! await this.employeeRepository.CanDeleteEmployeesAsync(EmployeeIds))
            {
                ret.SetErrorMessage("Not all Employees chan be deleted, because some are Managers.");
            }
            else {
                await this.employeeRepository.DeleteEmployeesAsync(EmployeeIds);
            }
            return ret.Get();
        }

        public async Task SaveEmployeeAvailability(Guid employeeId, int year, int month, int precentage)
        {
            Employee e = await this.employeeRepository.GetById(employeeId);
            if (e == null)
            {
                throw new Exception("Employee for availability does not exist!");
            }
            await this.employeeRepository.SaveEmployeeAvailabilityAsync(employeeId, year, month, precentage);
        }

        public IList<EmployeeDto> ListAllEmployees()
        {
            var el = this.employeeRepository.GetAllAsync().Result;
            IList<EmployeeDto> dtos = new List<EmployeeDto>();
            foreach (Employee e in el)
            {
                var d = new EmployeeDto();
                d.Name = e.Name;
                d.Email = e.Email;
                dtos.Add(d);
            }
            return dtos;
        }

        public IList<EmployeeSkillDto> ListEmployeeSkills(Guid EmployeeId)
        {
            this.employeeRepository.ListEmployeeSkills(EmployeeId);
            return null;

        }

        public IList<EmployeeDto> ListAllEmployeesFake()
        {
            return this.fakeData();
        }

        private IList<EmployeeDto> fakeData()
        {
            IList<EmployeeDto> ret = new List<EmployeeDto>();
            for (int i = 0; i < 20; i++)
            {
                ret.Add(new EmployeeDto() { Name = "Empl" + i.ToString(), Email = string.Format("empl{0}@company.com", i.ToString()) });
            }
            return ret;
        }

        private List<AvailabilityEntryDto> Make6entiries(DateTime dt)
        {
            List<AvailabilityEntryDto> ret = new List<AvailabilityEntryDto>();
            // so we have for sure something to show.
            for (int i = 0; i < 6; i++)
            {
                int year = dt.AddMonths(i).Year;
                int month = dt.AddMonths(i).Month;
                ret.Add(new AvailabilityEntryDto() { Year = year, Month = month, Precentage = 0 });
            }
            return ret;
        }

    }
}
