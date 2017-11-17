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

        /// <summary>
        /// Construction type name
        /// </summary>
        public string Type { get; set; }

        /// <summary>
        /// Construction status name
        /// </summary>
        public string Status { get; set; }

        public int Page { get; set; }
        public int PageSize { get; set; }
    }
}
