using Omi.Data.Entity;

namespace Omi.Modules.Dbgroup.Construction.Entities
{
    public class ConstructionDetail : 
        BaseEntityDetail<long, ConstructionEntity>
    {
        public string Title { get; set; }
        public string FinishDate { get; set; }
        public string Customer { get; set; }
        public string Description { get; set; }

        public int Area { get; set; }
    }
}