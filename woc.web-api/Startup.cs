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
using Microsoft.AspNetCore.Authentication.JwtBearer;
using DinkToPdf.Contracts;
using DinkToPdf;

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
            foreach (var item in configuration.AsEnumerable())
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
                    .AllowCredentials());
            });

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            }).AddJwtBearer(options =>
            {
                options.Authority = "https://login.microsoftonline.com/87595dac-c372-4455-9459-c98411db977e"; // <- tenantId
                options.Audience = "17aed305-1227-481e-9408-3b37f5bd063c"; // <- clientId
                options.TokenValidationParameters.ValidateLifetime = true;
                options.TokenValidationParameters.ClockSkew = TimeSpan.Zero;
            });

            services.AddAuthorization();

            services.AddMvc();

            //string sqlConnectionString = "Server=CSCCHEAH749842, 1433;Database=CockpitDesign;User Id=MicroBizUser;Password=Azureisgreat_123;";

            string sqlConnectionString = Configuration["secretConnectionString"]; // kommt aus user-secrets im DEV Fall.


            services.AddSingleton(typeof(IConverter), new SynchronizedConverter(new PdfTools()));

            services.AddTransient<EmployeeRepository>(sp => new EmployeeRepository(sqlConnectionString));
            services.AddTransient<ProjectRepository>(sp => new ProjectRepository(sqlConnectionString));
            services.AddTransient<RegionRepository>(sp => new RegionRepository(sqlConnectionString));
            services.AddTransient<OfferingRepository>(sp => new OfferingRepository(sqlConnectionString));
            services.AddTransient<IndustryRepository>(sp => new IndustryRepository(sqlConnectionString));
            services.AddTransient<CustomerRepository>(sp => new CustomerRepository(sqlConnectionString));
            services.AddTransient<SkillRepository>(sp => new SkillRepository(sqlConnectionString));

            services.AddTransient<EmployeeService, EmployeeService>();
            services.AddTransient<ProjectService, ProjectService>();
            services.AddTransient<RegionService, RegionService>();
            services.AddTransient<OfferingService, OfferingService>();
            services.AddTransient<IndustryService, IndustryService>();
            services.AddTransient<CustomerService, CustomerService>();
            services.AddTransient<SkillService, SkillService>();
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

            app.UseAuthentication();

            // global policy - assign here or on each controller
            app.UseCors("CorsPolicy");

            app.UseMvc();
        }
    }
}
