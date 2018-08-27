using System;

namespace woc.appDomain
{
    public class WorkPlace: IEntityBase
    {
        public WorkPlace(Guid? Id, string country, string city, string name)
        {
            if(!Id.HasValue){
                this.Id = Guid.NewGuid();
            }
            else{
                this.Id = Id.Value;
            }
            this.Country = country;
            this.City = city;
            this.Name = name;
        }

        public Guid Id { get; private set; }
        public string Country { get; private set; }
        public string City { get; private set; }
        public string Name { get; private set; }
    }
}