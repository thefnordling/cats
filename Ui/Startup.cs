using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NSwag;
using NSwag.SwaggerGeneration.Processors.Security;
using Services;

namespace Ui
{
    public class Startup
    {
        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            CurrentEnvironment = env;
        }

        public IConfiguration Configuration { get; }
        public IHostingEnvironment CurrentEnvironment { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSignalR();

            services.AddMvc(options =>
            {
                var policy = new AuthorizationPolicyBuilder()
                .RequireAuthenticatedUser()
                .Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            })
            .SetCompatibilityVersion(CompatibilityVersion.Version_2_2)
            .AddRazorOptions(options => options.AllowRecompilingViewsOnFileChange = true);

            services.Configure<CookiePolicyOptions>(options =>
            {
                // This lambda determines whether user consent for non-essential cookies is needed for a given request.
                options.CheckConsentNeeded = context => true;
                options.MinimumSameSitePolicy = SameSiteMode.None;
            });

            services
                .AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddCookie(options =>
                {
                    options.LoginPath = "/Home/Login";
                    options.LogoutPath = "/Home/Logout";
                    options.Cookie.Path = "/";
                });

            var catRepo = new CatRepository();

            services.AddSingleton(typeof(CatRepository), catRepo);
            services.AddSingleton(typeof(Cache), new Cache(catRepo));
            if (CurrentEnvironment.IsDevelopment())
            {
                services.AddSwaggerDocument(config =>
                {
                    config.PostProcess = document =>
                    {
                        document.Info.Version = "v1";
                        document.Info.Title = "CATS API";
                        document.Info.Description = "An API To Manage All Cats Everywhere";
                        document.Info.Contact = new NSwag.SwaggerContact
                        {
                            Name = "Matthew Fitzpatrick",
                            Email = string.Empty,
                            Url = "https://github.com/thefnordling"
                        };
                        document.Info.License = new NSwag.SwaggerLicense
                        {
                            Name = "MIT LICENSE",
                            Url = "https://github.com/thefnordling/cats/blob/master/LICENSE"
                        };
                    };
                });
            }
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (CurrentEnvironment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseAuthentication();

            app.UseStaticFiles();

            app.UseSignalR(c =>
            {
                c.MapHub<CatHub>("/hub");
            });

            var cookiePolicyOptions = new CookiePolicyOptions
            {
                MinimumSameSitePolicy = SameSiteMode.Strict,
            };
            app.UseCookiePolicy(cookiePolicyOptions);
            app.UseMvc(routes =>
            {
                routes.MapRoute(
                    name: "default",
                    template: "{controller=Home}/{action=Index}/{id?}");
            });

            if (CurrentEnvironment.IsDevelopment())
            {
                app.UseSwaggerUi3(c =>
                {
                    c.DocumentPath = "/Cats/swagger/{documentName}/swagger.json";
                });
                app.UseSwagger();
            }
        }
    }
}
