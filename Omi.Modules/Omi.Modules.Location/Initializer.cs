using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;
using Omi.Modules.Location.DbSeed;
using Omi.Modules.Location.Services;
using Omi.Modules.ModuleBase;

namespace Omi.Modules.Location
{
    public class LocationInitializer : IModuleInitializer
    {
        public async void Init(IServiceCollection services)
        {
            var serviceProvider = services.BuildServiceProvider();

            services.AddDbContext<LocationDbContext>();
            services.AddScoped<LocationService>();

            var dbContext = serviceProvider.GetService<LocationDbContext>();

            //var locationSeed = new LocationSeed();
            //await locationSeed.SeedAsync(dbContext);
        }
    }
}