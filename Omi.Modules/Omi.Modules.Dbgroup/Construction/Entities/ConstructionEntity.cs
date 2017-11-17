using Omi.Data.Entity;
using Omi.Modules.Dbgroup.ServiceModels;
using Omi.Modules.FileAndMedia.Base.Entity;
using Omi.Modules.ModuleBase.Base.Entity;
using System.Collections.Generic;
using System.Linq;

namespace Omi.Modules.Dbgroup.Construction.Entities
{
    public class ConstructionEntity :
        BaseEntity,
        IEntityWithName,
        IEntityWithDetails<ConstructionDetail>,
        IEntityWithTaxonomies<long, ConstructionEntity, ConstructionTaxonomy>,
        IEntityWithFiles<long, ConstructionEntity, ConstructionFile>
    {
        public ConstructionEntity(): base()
        {
            Details = new HashSet<ConstructionDetail>();
            EntityTaxonomies = new HashSet<ConstructionTaxonomy>();
            EnitityFiles = new HashSet<ConstructionFile>();
        }

        public string Name { get; set; }

        public IEnumerable<ConstructionDetail> Details { get ; set ; }
        public IEnumerable<ConstructionTaxonomy> EntityTaxonomies { get; set; }
        public IEnumerable<ConstructionFile> EnitityFiles { get; set; }
    }

    public static class ConstructionEntityExt
    {
        public static ConstructionEntity FromServiceModel(ConstructionServiceModel serviceModel)
            => new ConstructionEntity
            {
                Id = serviceModel.Id,
                Name = serviceModel.Name,
                CreateByUserId = serviceModel.User.Id,
                Details = new List<ConstructionDetail>() {
                    serviceModel.Detail
                },
                EnitityFiles = serviceModel.GetEntityFiles(),
                EntityTaxonomies = new List<ConstructionTaxonomy>(
                    serviceModel.TaxonomyIds.Select(taxonomyId => new ConstructionTaxonomy { TaxonomyId = taxonomyId, EntityId = serviceModel.Id }))
            };
    }
}