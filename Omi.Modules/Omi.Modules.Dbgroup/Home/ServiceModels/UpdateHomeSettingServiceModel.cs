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

            settingValues.Add(SettingValueExt.FromViewModel(viewModel.HowItWorkBuildHtml));
            settingValues.Add(SettingValueExt.FromViewModel(viewModel.HowItWorkDesignHtml));
            settingValues.Add(SettingValueExt.FromViewModel(viewModel.SlideImages));
            settingValues.Add(SettingValueExt.FromViewModel(viewModel.StoryHtml));
            settingValues.Add(SettingValueExt.FromViewModel(viewModel.WhatDoIWillReceive));

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
