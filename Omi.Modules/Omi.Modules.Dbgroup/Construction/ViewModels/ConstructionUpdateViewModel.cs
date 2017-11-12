using Omi.Modules.FileAndMedia.ViewModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Omi.Modules.Dbgroup.ViewModels
{
    public class ConstructionUpdateViewModel
    {
        public long Id { get; set; }

        [Required]
        public string Title { get; set; }

        public string SortText { get; set; }

        [Required]
        public int Price { get; set; }

        [Required]
        public int Area { get; set; }

        [Required]
        public long HouseTypeId { get; set; }

        [Required]
        public long DesignThemeId { get; set; }

        public string Language { get; set; } = Omi.Base.Properties.Resources.DEFAULT_LANGUAGE;

        public FileEntityInfo Avatar { get; set; }
        public IEnumerable<FileEntityInfo> Pictures { get; set; }
        public IEnumerable<long> ConstructionIncludedItemIds { get; set; }
    }
}
