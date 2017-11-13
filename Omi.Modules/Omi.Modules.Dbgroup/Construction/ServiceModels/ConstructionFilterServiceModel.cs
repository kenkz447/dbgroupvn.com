using Omi.Base;
using Omi.Modules.Dbgroup.ViewModels;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Dbgroup.ServiceModels
{
    public static class ConstructionFilterServiceModelExt {
        public static ConstructionFilterServiceModel FromViewModel(ConstructionFilterViewModel viewModel)
            => new ConstructionFilterServiceModel
            {
                SortBy = viewModel.SortBy,
                TaxonomyIds = new List<long>() { viewModel.ConstructionType, viewModel.StatusId },
                Page = viewModel.Page,
                PageSize = viewModel.PageSize
            };
    }

    public class ConstructionFilterServiceModel : BaseFilterServiceModel
    {
        public List<long> TaxonomyIds { get; set; }
    }
}
