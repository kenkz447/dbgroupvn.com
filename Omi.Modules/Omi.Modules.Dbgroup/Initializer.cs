using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;
using Omi.Modules.Dbgroup.Home.Seed;
using Omi.Modules.Dbgroup.Home.Services;

namespace Omi.Modules.Dbgroup
{
    public class DbgroupInitializer : IModuleInitializer
    {
        public async void Init(IServiceCollection services)
        {
            services.AddDbContext<DbgroupDbContext>();
            services.AddScoped<HomeService>();

            var serviceProvider = services.BuildServiceProvider();

            var dbContext = serviceProvider.GetService<DbgroupDbContext>();

            var homeSettingSeed = new HomeSettingSeed();
            await homeSettingSeed.SeedAsync(dbContext);
        }
    }
}