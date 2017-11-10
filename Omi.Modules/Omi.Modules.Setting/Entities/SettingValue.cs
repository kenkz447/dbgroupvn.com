using Omi.Data.Entity;
using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Setting.Entities
{
    public class SettingValue : 
        EntityWithTypeId<long>
    {
        public string Key { get; set; }
        public string Value { get; set; }

        public string Language { get; set; }
        public long SettingEntityId { get; set; }

        public SettingEntity SettingEntity { get; set; }
    }
}
