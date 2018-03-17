using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bugs.Models.Context;
using Bugs.Models.Reposotories.Api;
using Bugs.Models.Reposotories.Impl;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace Bugs
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            this.RegContextViaDepInject(services);
            services.AddScoped<IRepositoryFacade, RepositoryFacade>();
            services.AddMvc();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseBrowserLink();
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Home/Error");
            }

            app.UseStaticFiles();

            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });
        }

        private void RegContextViaDepInject(IServiceCollection services)
        {
#if DEBUG
            services.AddDbContext<BugContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("DebugConnection")));
#else
            services.AddDbContext<BugContext>(options => 
                options.UseSqlServer(Configuration.GetConnectionString("ReleaseConnection")));
#endif
        }
    }
}
