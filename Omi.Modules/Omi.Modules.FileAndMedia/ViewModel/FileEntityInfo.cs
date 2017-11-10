using Omi.Modules.FileAndMedia.Entities;
using Omi.Modules.FileAndMedia.Misc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Omi.Modules.FileAndMedia.ViewModel
{
    public class FileEntityInfo
    {
        public FileEntityInfo()
        {

        }

        public static FileEntityInfo FromEntity(FileEntity entity)
        {
            if (entity == null)
                return default;

            var FileEntityInfo = new FileEntityInfo
            {
                FileId = entity.Id,
                Src = entity.Src
            };

            var fileMeta = entity.GetMeta();

            if (fileMeta.ThumbnailFileName != null)
                FileEntityInfo.srcThumb = $"{Path.GetDirectoryName(entity.Src)}/{fileMeta.ThumbnailFileName}".Replace('\\', '/');

            return FileEntityInfo;
        }

        public long FileId { get; set; }
        public string Src { get; set; }
        public string srcThumb {get;set;}
    }
}