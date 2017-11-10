using Omi.Modules.Dbgroup.Home.ServiceModels;
using Omi.Modules.Setting.Entities;
using Omi.Modules.Setting.ServiceModels;
using Omi.Modules.Setting.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Omi.Modules.Dbgroup.Home.Services
{
    public class HomeService
    {
        private const string HOME_SETTING_NAME = "home";

        private GetSettingServiceModel readHomeSettingServiceModel
        {
            get
            {
                return new GetSettingServiceModel { Name = HOME_SETTING_NAME };
            }
        }

        private readonly SettingService _setting;

        public HomeService(SettingService setting)
        {
            _setting = setting;
        }

        public async Task<SettingEntity> GetSetting()
            => await _setting.Get(readHomeSettingServiceModel);

        public async Task<bool> UpdateSetting(UpdateHomeSettingServiceModel serviceModel)
        {
            var updateServiceModel = new UpdateSettingServiceModel
            {
                Name = HOME_SETTING_NAME,
                SettingValues = serviceModel.SettingValues,
                UpdateBy = serviceModel.UpdateBy
            };

            var resultCount = await _setting.Update(updateServiceModel);

            return resultCount > 0;
        }
    }
}
