using Omi.Base;
using Omi.Modules.Dbgroup.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Dbgroup.ServiceModels
{
    public partial class ConstructionFilterServiceModel {
        public static ConstructionFilterServiceModel FromViewModel(ConstructionFilterViewModel viewModel)
            => new ConstructionFilterServiceModel
            {
                SortBy = viewModel.SortBy,
                TaxonomyNames = new List<string>() { viewModel.Type, viewModel.Status },
                Page = viewModel.Page,
                PageSize = viewModel.PageSize
            };
    }

    public partial class ConstructionFilterServiceModel : BaseFilterServiceModel
    {
        public List<string> TaxonomyNames { get; set; }
    }
}
