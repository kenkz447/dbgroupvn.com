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
    public class ConstructionCategoriesSeed : IDbSeed
    {
        public static TaxonomyType ConstructionType = new TaxonomyType
        {
            Name = "construction"
        };

        public static TaxonomyEntity Residence = new TaxonomyEntity
        {
            Name = "residence",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Residence",
                }
            }
        };
        public static TaxonomyEntity Townhouse = new TaxonomyEntity
        {
            Name = "townhouse",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Townhouse",
                }
            }
        };
        public static TaxonomyEntity Villa = new TaxonomyEntity
        {
            Name = "villa",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Villa",
                }
            }
        };
        public static TaxonomyEntity Apartment = new TaxonomyEntity
        {
            Name = "apartment",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Apartment",
                }
            }
        };

        public static TaxonomyEntity Hospitality = new TaxonomyEntity
        {
            Name = "hospitality",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Hospitality",
                }
            }
        };
        public static TaxonomyEntity Hotel = new TaxonomyEntity
        {
            Name = "hotel",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Hotel",
                }
            }
        };
        public static TaxonomyEntity Resort = new TaxonomyEntity
        {
            Name = "resort",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Resort",
                }
            }
        };

        public static TaxonomyEntity FAndB = new TaxonomyEntity
        {
            Name = "f&b",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "F&B",
                }
            }
        };
        public static TaxonomyEntity Coffee = new TaxonomyEntity
        {
            Name = "coffee",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Coffee",
                }
            }
        };
        public static TaxonomyEntity Restaurant = new TaxonomyEntity
        {
            Name = "restaurant",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Restaurant",
                }
            }
        };
        public static TaxonomyEntity Bar = new TaxonomyEntity
        {
            Name = "bar",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Bar",
                }
            }
        };

        public static TaxonomyEntity Commecial = new TaxonomyEntity
        {
            Name = "commecial",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Commecial",
                }
            }
        };
        public static TaxonomyEntity Showroom = new TaxonomyEntity
        {
            Name = "showroom",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Commecial",
                }
            }
        };
        public static TaxonomyEntity Shop = new TaxonomyEntity
        {
            Name = "shop",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Shop",
                }
            }
        };

        public static TaxonomyEntity Office = new TaxonomyEntity
        {
            Name = "office",
            Details = new List<TaxonomyDetail>
            {
                new TaxonomyDetail
                {
                    Label = "Office",
                }
            }
        };

        public async Task SeedAsync(DbContext dbConext)
        {
            var taxonomyTypeSet = dbConext.Set<TaxonomyType>();
            ConstructionType = taxonomyTypeSet.SeedEntity(ConstructionType);

            var taxonomySet = dbConext.Set<TaxonomyEntity>();

            // Residence
            Residence.TaxonomyTypeId = ConstructionType.Id;
            Residence = taxonomySet.SeedEntity(Residence);

            Townhouse.TaxonomyTypeId = ConstructionType.Id;
            Townhouse.ParentId = Residence.Id;
            Townhouse = taxonomySet.SeedEntity(Townhouse);

            Villa.TaxonomyTypeId = ConstructionType.Id;
            Villa.ParentId = Residence.Id;
            Villa = taxonomySet.SeedEntity(Villa);

            Apartment.TaxonomyTypeId = ConstructionType.Id;
            Apartment.ParentId = Residence.Id;
            Apartment = taxonomySet.SeedEntity(Apartment);

            // Hospitality
            Hospitality.TaxonomyTypeId = ConstructionType.Id;
            Hospitality = taxonomySet.SeedEntity(Hospitality);

            Hotel.TaxonomyTypeId = ConstructionType.Id;
            Hotel.ParentId = Hospitality.Id;
            Hotel = taxonomySet.SeedEntity(Hotel);

            Resort.TaxonomyTypeId = ConstructionType.Id;
            Resort.ParentId = Hospitality.Id;
            Resort = taxonomySet.SeedEntity(Resort);

            // Commecial
            FAndB.TaxonomyTypeId = ConstructionType.Id;
            FAndB = taxonomySet.SeedEntity(FAndB);

            Coffee.TaxonomyTypeId = ConstructionType.Id;
            Coffee.ParentId = FAndB.Id;
            Coffee = taxonomySet.SeedEntity(Coffee);

            Restaurant.TaxonomyTypeId = ConstructionType.Id;
            Restaurant.ParentId = FAndB.Id;
            Restaurant = taxonomySet.SeedEntity(Restaurant);

            Bar.TaxonomyTypeId = ConstructionType.Id;
            Bar.ParentId = FAndB.Id;
            Bar = taxonomySet.SeedEntity(Bar);

            // FAndB
            Commecial.TaxonomyTypeId = ConstructionType.Id;
            Commecial = taxonomySet.SeedEntity(Commecial);

            Showroom.TaxonomyTypeId = ConstructionType.Id;
            Showroom.ParentId = FAndB.Id;
            Showroom = taxonomySet.SeedEntity(Showroom);

            Shop.TaxonomyTypeId = ConstructionType.Id;
            Shop.ParentId = FAndB.Id;
            Shop = taxonomySet.SeedEntity(Shop);

            // FAndB
            Office.TaxonomyTypeId = ConstructionType.Id;
            Office = taxonomySet.SeedEntity(Office);

            await dbConext.SaveChangesAsync();
        }
    }
}
