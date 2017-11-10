using Microsoft.EntityFrameworkCore;
using Omi.Modular;
using Omi.Modules.Dbgroup.Construction.Entities;
using Omi.Modules.ModuleBase.Entities;

namespace Omi.Modules.Dbgroup
{
    public class DbgroupModelBuilder : ICustomModelBuilder
    {
        public void Build(ModelBuilder builder)
        {
            builder.Entity<ConstructionEntity>()
                .HasAlternateKey(o => o.Name);
        }
    }
}
