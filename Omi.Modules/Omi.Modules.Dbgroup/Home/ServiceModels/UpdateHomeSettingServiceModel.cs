using Newtonsoft.Json;
using Omi.Modules.Dbgroup.Home.ViewModels;
using Omi.Modules.Setting.Entities;
using Omi.Modules.Setting.ServiceModels;
using System.Collections.Generic;
using System.Linq;

namespace Omi.Modules.Dbgroup.Home.ServiceModels
{
    public static class UpdateHomeSettingServiceModelExt
    {
        public static UpdateHomeSettingServiceModel FromViewModel(HomeSettingViewModel viewModel)
        {
            var settingValues = new List<SettingValue>();
            settingValues.AddRange(viewModel.SettingValues.Select(o => new SettingValue
            {
                SettingEntityId = viewModel.SettingEntityId,
                Id = o.Id,
                Key = o.Key,
                Value = JsonConvert.SerializeObject(o.Value)
            }));

            return new UpdateHomeSettingServiceModel
            {
                SettingValues = settingValues
            };
        }
    }

    public class UpdateHomeSettingServiceModel : UpdateSettingServiceModel
    {

    }
}
