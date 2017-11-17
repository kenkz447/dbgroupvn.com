using System;
using System.Collections.Generic;
using System.Text;
using Omi.Modules.ModuleBase.Entities;

namespace Omi.Modules.ModuleBase.Base.Entity
{
    public abstract class EnitityTaxonomy<TEntityId, Tentity> : IEntityTaxonomy<TEntityId, Tentity>
    {
        public TEntityId EntityId { get; set; }
        public long TaxonomyId { get; set; }
        public Tentity Entity { get; set; }
        public TaxonomyEntity Taxonomy { get; set; }
    }
}
