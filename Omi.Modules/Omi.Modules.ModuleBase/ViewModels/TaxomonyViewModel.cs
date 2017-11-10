using Omi.Modules.ModuleBase.Entities;
using System.Globalization;
using System.Linq;

namespace Omi.Modules.ModuleBase.ViewModels
{
    public class TaxomonyViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Label { get; set; }
        public string Icon { get; set; }
        public long? TaxonomyTypeId { get; set; }

        public static TaxomonyViewModel FromEntity(TaxonomyEntity entity)
        {
            var currentCulture = CultureInfo.CurrentCulture;

            var taxonomyDetail = entity.Details.FirstOrDefault(o => o.Language == currentCulture.DisplayName);

            return new TaxomonyViewModel
            {
                Id = entity.Id,
                Name = entity.Name,
                Label = taxonomyDetail?.Label,
                Icon = taxonomyDetail?.Icon,
                TaxonomyTypeId = entity.TaxonomyTypeId
            };
        }
    }
}
