using Microsoft.EntityFrameworkCore;
using Omi.Data;
using Omi.Modular;
using Omi.Modules.Dbgroup.Construction.Entities;
using Omi.Modules.ModuleBase;
using Omi.Modules.ModuleBase.Entities;
using Omi.Modules.Setting;
using System.Collections.Generic;

namespace Omi.Modules.Dbgroup
{
    public class DbgroupDbContext : ApplicationDbContext
    {
        public DbgroupDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {

        }

        public DbSet<ConstructionEntity> ConstructionEntity { get; set; }
        public DbSet<TaxonomyEntity> TaxonomyEntity { get; set; }
        public DbSet<FileAndMedia.Entities.FileEntity> FileEntity { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.RegisterCustomMappings<ModuleBaseModelBuilder>();
            builder.RegisterCustomMappings<SettingModelBuilder>();
            builder.RegisterCustomMappings<DbgroupModelBuilder>();
            builder.RegisterCustomMappings<FileAndMedia.ModuleBaseModelBuilder>();
            base.OnModelCreating(builder);
        }
    }
}
