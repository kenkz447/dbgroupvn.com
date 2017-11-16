using Omi.Modules.Setting.Entities;
using Omi.Modules.Setting.ViewModels;
using System.Collections.Generic;
using System.Globalization;
using System.Linq;
using System.Threading;

namespace Omi.Modules.Dbgroup.Home.ViewModels
{
    public class HomeSettingViewModel
    {
        public long SettingEntityId { get; set; }
        public string Language { get; set; }

        public SettingValueViewModel SlideImages { get; set; }
        public SettingValueViewModel StoryHtml { get; set; }
        public SettingValueViewModel HowItWorkBuildHtml { get; set; }
        public SettingValueViewModel HowItWorkDesignHtml { get; set; }
        public SettingValueViewModel WhatDoIWillReceive { get; set; }
        public SettingValueViewModel WhatDoIWillReceiveBuild { get; set; }
    }

    public static class HomeSettingViewModelExt {
        public static HomeSettingViewModel FromEntity(SettingEntity entity)
        {
            var settingValues = entity.SettingValues;

            var slideImages = entity.SettingValues.FirstOrDefault(o => o.Name == "SlideImages");
            var storyHtml = entity.SettingValues.FirstOrDefault(o => o.Name == "StoryHtml");

            var howItWorkDesignHtml = entity.SettingValues.FirstOrDefault(o => o.Name == "HowItWorkDesignHtml");
            var whatDoIWillReceive = entity.SettingValues.FirstOrDefault(o => o.Name == "WhatDoIWillReceive");

            var howItWorkBuildHtml = entity.SettingValues.FirstOrDefault(o => o.Name == "HowItWorkBuildHtml");
            var whatDoIWillReceiveBuild = entity.SettingValues.FirstOrDefault(o => o.Name == "WhatDoIWillReceiveBuild");

            return new HomeSettingViewModel
            {
                SettingEntityId = entity.Id,
                Language = Thread.CurrentThread.CurrentCulture.Name,
                SlideImages = SettingValueViewModelExt.FromEntity(slideImages),
                StoryHtml = SettingValueViewModelExt.FromEntity(storyHtml),
                HowItWorkBuildHtml = SettingValueViewModelExt.FromEntity(howItWorkBuildHtml),
                HowItWorkDesignHtml = SettingValueViewModelExt.FromEntity(howItWorkDesignHtml),
                WhatDoIWillReceive = SettingValueViewModelExt.FromEntity(whatDoIWillReceive),
                WhatDoIWillReceiveBuild = SettingValueViewModelExt.FromEntity(whatDoIWillReceiveBuild)
            };
        }
    }
}