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
        public string Description { get; set; }
        public string Customer { get; set; }
        public string FinishDate { get; set; }

        [Required] 
        public int Area { get; set; }

        [Required]
        public long ConstructionTypeId { get; set; }

        [Required]
        public long StatusId { get; set; }

        public string Language { get; set; }

        public FileEntityInfo Avatar { get; set; }
        public IEnumerable<FileEntityInfo> Pictures { get; set; }
    }
}
