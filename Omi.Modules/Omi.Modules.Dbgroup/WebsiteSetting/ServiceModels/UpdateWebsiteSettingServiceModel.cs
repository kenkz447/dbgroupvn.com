﻿using Newtonsoft.Json;
using Omi.Modules.Dbgroup.WebsiteSetting.ViewModels;
using Omi.Modules.Setting.Entities;
using Omi.Modules.Setting.Infrastructure;
using Omi.Modules.Setting.ServiceModels;
using System.Collections.Generic;
using System.Linq;

namespace Omi.Modules.Dbgroup.WebsiteSetting.ServiceModels
{
    public partial class UpdateWebsiteSettingServiceModel
    {
        public static UpdateWebsiteSettingServiceModel FromViewModel(WebsiteSettingViewModel viewModel)
        {
            var settingValues = EntitySettingUtilities.GetSettingValues(viewModel);

            return new UpdateWebsiteSettingServiceModel
            {
                SettingValues = settingValues
            };
        }
    }

    public partial class UpdateWebsiteSettingServiceModel : UpdateSettingServiceModel
    {

    }
}
