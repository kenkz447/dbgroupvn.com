using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.Setting.ViewModels
{
    public class SettingValueViewModel
    {
        public long Id { get; set; }
        public string Key { get; set; }
        public object Value { get; set; }
    }
}
