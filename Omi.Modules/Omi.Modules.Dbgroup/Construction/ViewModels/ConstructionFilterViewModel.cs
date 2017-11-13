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
        public long ConstructionType { get; set; }
        public long StatusId { get; set; }

        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
