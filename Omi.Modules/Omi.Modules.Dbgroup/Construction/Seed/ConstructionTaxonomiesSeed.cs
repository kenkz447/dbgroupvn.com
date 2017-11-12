using Omi.Modular;
using Omi.Modules.ModuleBase.Entities;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Omi.Extensions;

namespace Omi.Modules.Dbgroup.Construction.Seed
{
    public class ConstructionTaxonomiesSeed: IDbSeed
    {
        public static TaxonomyType ConstructionType = new TaxonomyType
        {
            Name = "construction"
        };

        public async Task SeedAsync(DbContext dbConext)
        {
            var taxonomyTypeSet = dbConext.Set<TaxonomyType>();
            ConstructionType = taxonomyTypeSet.SeedEntity(ConstructionType);

            await dbConext.SaveChangesAsync();
        }
    }
}
