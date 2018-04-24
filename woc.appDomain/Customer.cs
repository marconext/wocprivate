using System;

namespace woc.appDomain
{
    public class Customer
    {
        public Customer(Guid? Id, string name)
        {
            if(!Id.HasValue){
                this.Id = Guid.NewGuid();
            } else {
                this.Id = Id.Value;
            }
            this.Name = name;
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
    }
}