using System;

namespace woc.appDomain
{
    public class Employee
    {

        public Employee(string name)
        {
            this.Name = name;
            this.Email = "";
        }

        public string Name { get; private set; }
        public string Email { get; private set; }
    }
}
