using Omi.Base;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Dbgroup.ServiceModels
{
    public class ConstructionFilterServiceModel : BaseFilterServiceModel
    {
        public List<long> TaxonomyIds { get; set; }
    }
}
