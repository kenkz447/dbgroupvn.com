using Omi.Data.Entity;
using Omi.Modules.FileAndMedia.Base.Entity;
using Omi.Modules.ModuleBase.Base.Entity;
using System.Collections.Generic;

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
}