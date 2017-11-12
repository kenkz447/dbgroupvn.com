﻿using Omi.Modular;
using System;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using Omi.Modules.Setting.Entities;
using Omi.Extensions;

namespace Omi.Modules.Dbgroup.Home.Seed
{
    public class HomeSettingSeed : IDbSeed
    {
        public static SettingEntity HomeSetting = new SettingEntity
        {
            Name = "home"
        };

        public static SettingValue SlideImages = new SettingValue
        {
            Name = "SlideImages",
        };

        public static SettingValue StoryHtml = new SettingValue
        {
            Name = "StoryHtml",
        };

        public static SettingValue HowItWorkBuildHtml = new SettingValue
        {
            Name = "HowItWorkBuildHtml",
        };

        public static SettingValue HowItWorkDesignHtml = new SettingValue
        {
            Name = "HowItWorkDesignHtml",
        };

        public static SettingValue WhatDoIWillReceive = new SettingValue
        {
            Name = "WhatDoIWillReceive"
        };

        public async Task SeedAsync(DbContext dbConext)
        {
            var settingSet = dbConext.Set<SettingEntity>();
            HomeSetting = settingSet.SeedEntity(HomeSetting);

            var settingValueSet = dbConext.Set<SettingValue>();

            SlideImages.SettingEntityId = HomeSetting.Id;
            SlideImages = settingValueSet.SeedEntity(SlideImages);

            StoryHtml.SettingEntityId = HomeSetting.Id;
            StoryHtml = settingValueSet.SeedEntity(StoryHtml);

            HowItWorkBuildHtml.SettingEntityId = HomeSetting.Id;
            HowItWorkBuildHtml = settingValueSet.SeedEntity(HowItWorkBuildHtml);

            HowItWorkDesignHtml.SettingEntityId = HomeSetting.Id;
            HowItWorkDesignHtml = settingValueSet.SeedEntity(HowItWorkDesignHtml);

            WhatDoIWillReceive.SettingEntityId = HomeSetting.Id;
            WhatDoIWillReceive = settingValueSet.SeedEntity(WhatDoIWillReceive);

            await dbConext.SaveChangesAsync();
        }
    }
}
