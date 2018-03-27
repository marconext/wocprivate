using System;

namespace woc.appDomain
{
    public class Skill
    {
        public Skill(string name)
        {
            this.Id = Guid.NewGuid();
            this.Name = name;
        }

        public Guid Id { get; private set; }
        public string Name { get; private set; }
    }
}