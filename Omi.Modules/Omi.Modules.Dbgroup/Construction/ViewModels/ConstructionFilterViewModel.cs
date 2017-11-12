using Omi.Modules.Dbgroup.ServiceModels;
using System.Collections.Generic;

namespace Omi.Modules.Dbgroup.ViewModels
{
    public class ConstructionFilterViewModel
    {
        public ConstructionFilterViewModel()
        {
            Page = 1;
            PageSize = 9;
        }

        public string SortBy { get; set; }
        public long DesignTheme { get; set; }
        public long HouseType { get; set; }
        public int BudgetMin { get; set; }
        public int BudgetMax { get; set; }
        public int Page { get; set; }
        public int PageSize { get; set; }

        public ConstructionFilterServiceModel ToServiceModel()
            => new ConstructionFilterServiceModel
            {
                SortBy = SortBy,
                TaxonomyIds = new List<long>() { DesignTheme, HouseType },
                Page = Page,
                PageSize = PageSize
            };
    }
}
