using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Dbgroup.Construction.Entities
{
    public class ConstructionDetail : 
        BaseEntityDetail<long, ConstructionEntity>
    {
        public string Title { get; set; }
        public string Customer { get; set; }
        public int Area { get; set; }
    }
}
