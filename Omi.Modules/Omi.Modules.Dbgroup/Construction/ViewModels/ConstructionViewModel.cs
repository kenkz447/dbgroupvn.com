using Omi.Modules.FileAndMedia.ViewModel;
using Omi.Modules.ModuleBase.ViewModels;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace Omi.Modules.Dbgroup.ViewModels
{
    public class ConstructionViewModel : ConstructionUpdateViewModel
    {
        public string ConstructionTypeLabel { get; set; }

        public string StatusLabel { get; set; }

        public IEnumerable<TaxomonyViewModel> AvaliableConstructionType { get; set; }

        public IEnumerable<TaxomonyViewModel> AvaliableConstructionStatus { get; set; }
    }
}
