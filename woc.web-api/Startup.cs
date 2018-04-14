using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using woc.appInfrastructure.Repositories;
using woc.appService;

using NSwag.AspNetCore;
using System.Reflection;
using NJsonSchema;

namespace woc.web_api
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            //Configuration = configuration;

            // der code für die user secrets habe ich im inet gefundn
            // https://github.com/jj09/crypto-search/blob/master/Startup.cs
            var builder = new ConfigurationBuilder();
            builder.AddUserSecrets<Startup>();  // https://docs.microsoft.com/en-us/aspnet/core/security/app-secrets?tabs=visual-studio-code

            Configuration = builder.Build();

            // jetzt werden die bestehenden settings eingefügt.
            // 
            foreach(var item in configuration.AsEnumerable())
            {
                Configuration[item.Key] = item.Value;
            }        
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Add service and create Policy with options
            services.AddCors(options =>
            {
                options.AddPolicy("CorsPolicy",
                    builder => builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials() );
            });


            services.AddMvc();

            //string sqlConnectionString = "Server=CSCCHEAH749842, 1433;Database=CockpitDesign;User Id=MicroBizUser;Password=Azureisgreat_123;";

            string sqlConnectionString = Configuration["secretConnectionString"]; // kommt aus user-secrets im DEV Fall.
            
            services.AddTransient<EmployeeRepository>(sp => new EmployeeRepository(sqlConnectionString));
            services.AddTransient<ProjectRepository>(sp => new ProjectRepository(sqlConnectionString));
            services.AddTransient<RegionRepository>(sp => new RegionRepository(sqlConnectionString));
            services.AddTransient<OfferingRepository>(sp => new OfferingRepository(sqlConnectionString));

            services.AddTransient<EmployeeService, EmployeeService>();
            services.AddTransient<ProjectService, ProjectService>();
            services.AddTransient<RegionService, RegionService>();
            services.AddTransient<OfferingService, OfferingService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            app.UseStaticFiles();

            // Enable the Swagger UI middleware and the Swagger generator
            app.UseSwaggerUi(typeof(Startup).GetTypeInfo().Assembly, settings =>
            {
                settings.GeneratorSettings.DefaultPropertyNameHandling = PropertyNameHandling.CamelCase;
            });


            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // global policy - assign here or on each controller
            app.UseCors("CorsPolicy");

            app.UseMvc();
        }
    }
}
