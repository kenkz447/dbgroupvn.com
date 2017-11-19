using Omi.Modules.Dbgroup.WebsiteSetting.Seed;
using Omi.Modules.Dbgroup.WebsiteSetting.ServiceModels;
using Omi.Modules.Setting.Entities;
using Omi.Modules.Setting.ServiceModels;
using Omi.Modules.Setting.Services;
using System.Threading.Tasks;

namespace Omi.Modules.Dbgroup.WebsiteSetting.Services
{
    public class WebsiteSettingService
    {
        private readonly SettingService _setting;

        public WebsiteSettingService(SettingService setting)
        {
            _setting = setting;
        }

        public async Task<SettingEntity> GetSetting()
            => await _setting.Get(new GetSettingServiceModel {
                Id = WebsiteSettingSeed.HomeSetting.Id
            });

        public async Task<bool> UpdateSetting(UpdateWebsiteSettingServiceModel serviceModel)
        {
            var updateServiceModel = new UpdateSettingServiceModel
            {
                Name = WebsiteSettingSeed.HomeSetting.Name,
                SettingValues = serviceModel.SettingValues,
                UpdateBy = serviceModel.UpdateBy
            };

            var resultCount = await _setting.Update(updateServiceModel);

            return resultCount > 0;
        }
    }
}
