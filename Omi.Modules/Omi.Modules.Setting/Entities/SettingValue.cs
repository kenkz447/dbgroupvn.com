using Omi.Data.Entity;
using Omi.Modules.Setting.ViewModels;
using System.Threading;

namespace Omi.Modules.Setting.Entities
{
    public static class SettingValueExt
    {
        public static SettingValue FromViewModel(SettingValueViewModel viewModel)
            => new SettingValue
            {
                Id = viewModel.Id,
                Name = viewModel.Name,
                Value = Newtonsoft.Json.JsonConvert.SerializeObject(viewModel.Value),
                Language = Thread.CurrentThread.CurrentCulture.Name
            };
    }

    public class SettingValue : 
        EntityWithTypeId<long>,
        IEntityWithName,
        IEntityWithLanguage
    {
        public string Name { get; set; }
        public string Value { get; set; }

        public string Language { get; set; }
        public long SettingEntityId { get; set; }

        public SettingEntity SettingEntity { get; set; }
    }
}
