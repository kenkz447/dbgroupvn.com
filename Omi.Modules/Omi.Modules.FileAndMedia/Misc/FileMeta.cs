using System;
using System.Collections.Generic;
using System.Text;

namespace Omi.Modules.FileAndMedia.Misc
{
    public class FileMeta
    {
        public FileMeta()
        {

        }

        public string Dimension { get; set; }
        public string ImageAlt { get; set; }
        public string ThumbnailFileName { get; set; }

        public string ToJsonString()
            => Newtonsoft.Json.JsonConvert.SerializeObject(this, new Newtonsoft.Json.JsonSerializerSettings {
                NullValueHandling = Newtonsoft.Json.NullValueHandling.Ignore
            });

        public static FileMeta DeserializeFileMeta(string jsonString)
            => Newtonsoft.Json.JsonConvert.DeserializeObject<FileMeta>(jsonString);
    }
}
