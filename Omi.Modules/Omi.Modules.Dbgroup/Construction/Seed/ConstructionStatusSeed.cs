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
    public class ConstructionStatusSeed : IDbSeed
    {
        public static TaxonomyType ConstructionStatus = new TaxonomyType
        {
            Name = "construction-status"
        };

        public static TaxonomyEntity GatherIdeas = new TaxonomyEntity
        {
            Name = "gather-ideas",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Gather ideas",
                }
            }
        };
        public static TaxonomyEntity UnderConstruction = new TaxonomyEntity
        {
            Name = "under-construction",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Under construction",
                }
            }
        };
        public static TaxonomyEntity Finish = new TaxonomyEntity
        {
            Name = "finish",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Finish",
                }
            }
        };

        public async Task SeedAsync(DbContext dbConext)
        {
            var taxonomyTypeSet = dbConext.Set<TaxonomyType>();
            ConstructionStatus = taxonomyTypeSet.SeedEntity(ConstructionStatus);

            var taxonomySet = dbConext.Set<TaxonomyEntity>();

            GatherIdeas.TaxonomyTypeId = ConstructionStatus.Id;
            GatherIdeas = taxonomySet.SeedEntity(GatherIdeas);

            UnderConstruction.TaxonomyTypeId = ConstructionStatus.Id;
            UnderConstruction = taxonomySet.SeedEntity(UnderConstruction);

            Finish.TaxonomyTypeId = ConstructionStatus.Id;
            Finish = taxonomySet.SeedEntity(Finish);

            await dbConext.SaveChangesAsync();
        }
    }
}
