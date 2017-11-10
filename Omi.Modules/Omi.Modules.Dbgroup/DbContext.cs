using Microsoft.EntityFrameworkCore;
using Omi.Data;
using Omi.Modular;
using Omi.Modules.Dbgroup.Construction.Entities;
using Omi.Modules.ModuleBase.Entities;
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

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.RegisterCustomMappings<DbgroupModelBuilder>();
            base.OnModelCreating(builder);
        }
    }
}
