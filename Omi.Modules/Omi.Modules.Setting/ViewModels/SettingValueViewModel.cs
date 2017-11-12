using Omi.Modules.Setting.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Setting.ViewModels
{
    public static class SettingValueViewModelExt
    {
        public static SettingValueViewModel FromEntity(SettingValue entity)
        {
            return new SettingValueViewModel
            {
                Id = entity.Id,
                Name = entity.Name,
                Value = entity.Value != default ? Newtonsoft.Json.JsonConvert.DeserializeObject(entity.Value) : null
            };
        }
    }

    public class SettingValueViewModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public object Value { get; set; }
    }
}
