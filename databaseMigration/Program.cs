using System;
using System.IO;
using Microsoft.Extensions.Configuration;

namespace databasemigration
{
    class Program
    {
        static void Main(string[] args)
        {
            var confBuilder = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory());
            confBuilder.AddJsonFile("c:\\temp\\appsettings.json");
            // confBuilder.AddUserSecrets();

            var configuration = confBuilder.Build();

            Console.WriteLine("Hello World!");
            Console.WriteLine(configuration["settingKey1"].ToString());

            // Console.WriteLine(configuration["secretConnectionString"].ToString());
        }
    }
}
