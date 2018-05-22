using System;
using System.Collections.Generic;
using System.Linq;

using woc.appDomain;
using woc.appInfrastructure.Repositories;
using woc.appInfrastructure.Dtos;
using System.Threading.Tasks;

namespace woc.appService
{
    public class CustomerService
    {
        private readonly CustomerRepository _customerRepository;

        // Ctor
        public CustomerService(CustomerRepository CustomerRepository) {
            this._customerRepository = CustomerRepository;
        }

        public async Task<IList<CustomerDto>> ListAllCustomersAsync() {
            var cc = await this._customerRepository.GetAllAsync();
            IList<CustomerDto> CustomerDtos = new List<CustomerDto>();
            foreach(Customer c in cc){
                var d = new CustomerDto();
                d.Id = c.Id;
                d.Name = c.Name;
                CustomerDtos.Add(d);
            }
            return CustomerDtos;
        }
    }
}
