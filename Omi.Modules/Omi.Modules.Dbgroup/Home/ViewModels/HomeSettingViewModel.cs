using Omi.Modules.Setting.Entities;
using Omi.Modules.Setting.ViewModels;
using System.Collections.Generic;
using System.Linq;
using System.Threading;

namespace Omi.Modules.Dbgroup.Home.ViewModels
{
    public class HomeSettingViewModel
    {
        public HomeSettingViewModel()
        {
            SettingValues = new List<SettingValueViewModel>();
        }

        public long SettingEntityId { get; set; }
        public string Language { get; set; }

        public IEnumerable<SettingValueViewModel> SettingValues { get; set; }
    }

    public static class HomeSettingViewModelExt {
        public static HomeSettingViewModel FromEntity(SettingEntity entity)
        {
            var settingValues = entity.SettingValues;

            var SettingValueViewModels = new List<SettingValueViewModel>();

            SettingValueViewModels.AddRange(settingValues.Select(o => new SettingValueViewModel {
                Id = o.Id,
                Key = o.Key,
                Value = Newtonsoft.Json.JsonConvert.DeserializeObject(o.Value)
            }));

            return new HomeSettingViewModel
            {
                SettingEntityId = entity.Id,
                Language = Thread.CurrentThread.CurrentCulture.Name,
                SettingValues = SettingValueViewModels
            };
        }
    }
}