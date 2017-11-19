using Omi.Modular;
using Microsoft.Extensions.DependencyInjection;
using Omi.Modules.Dbgroup.Home.Seed;
using Omi.Modules.Dbgroup.Home.Services;
using Omi.Modules.Dbgroup.Construction.Seed;
using Omi.Modules.Dbgroup.Services;
using Omi.Modules.Dbgroup.WebsiteSetting.Seed;
using Omi.Modules.Dbgroup.WebsiteSetting.Services;

namespace Omi.Modules.Dbgroup
{
    public class DbgroupInitializer : IModuleInitializer
    {
        public async void Init(IServiceCollection services)
        {
            services.AddDbContext<DbgroupDbContext>();
            services.AddScoped<WebsiteSettingService>();
            services.AddScoped<HomeService>();
            services.AddScoped<ConstructionService>();

            var serviceProvider = services.BuildServiceProvider();

            var dbContext = serviceProvider.GetService<DbgroupDbContext>();

            var homeSettingSeed = new HomeSettingSeed();
            await homeSettingSeed.SeedAsync(dbContext);

            var constructionTaxonomiesSeed = new ConstructionCategoriesSeed();
            await constructionTaxonomiesSeed.SeedAsync(dbContext);

            var constructionStatusSeed = new ConstructionStatusSeed();
            await constructionStatusSeed.SeedAsync(dbContext);

            var websiteSettingSeed = new WebsiteSettingSeed();
            await websiteSettingSeed.SeedAsync(dbContext);
        }
    }
}