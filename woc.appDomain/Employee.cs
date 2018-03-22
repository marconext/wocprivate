using System;

namespace woc.appdomain
{
    public class Employee
    {

        public Employee(string name, string email)
        {
            this.Name = name;
            this.Email = email;
        }

        public string Name { get; private set; }
        public string Email { get; private set; }
    }
}
