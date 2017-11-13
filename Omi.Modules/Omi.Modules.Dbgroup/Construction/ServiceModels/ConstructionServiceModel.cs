using Omi.Data;
using Omi.Modules.FileAndMedia.Base;
using System.Collections.Generic;
using System.Linq;
using Omi.Modules.Dbgroup.Construction.Entities;
using Omi.Modules.Dbgroup.ViewModels;
using Omi.Extensions;

namespace Omi.Modules.Dbgroup.ServiceModels
{
    public class ConstructionServiceModel
    {
        public long Id { get; set; }

        public string Name { get; set; }

        public ConstructionDetail Detail { get; set; }

        public IEnumerable<long> TaxonomyIds { get; set; }

        public long AvatarFileId { get; set; }
        public IEnumerable<long> PictureFileIds { get; set; }

        public ApplicationUser User { get; set; }

        public IEnumerable<ConstructionFile> GetEntityFiles()
        {
            var packageFiles = new List<ConstructionFile>()
                {
                    new ConstructionFile
                    {
                        UsingType = (int)FileUsingType.Avatar,
                        FileEntityId = AvatarFileId,
                        EntityId = Id,
                    },
                };

            packageFiles.AddRange(PictureFileIds.Select(o => new ConstructionFile
            {
                UsingType = (int)FileUsingType.Picture,
                FileEntityId = o,
                EntityId = Id,
            }));

            return packageFiles;
        }
    }

    public static class ConstructionServiceModelExt
    {
        public static ConstructionDetail GetConstructionDetail(ConstructionUpdateViewModel viewModel)
        => new ConstructionDetail
        {
            EntityId = viewModel.Id,
            Area = viewModel.Area,
            Title = viewModel.Title,
            Language = viewModel.Language
        };

        public static ConstructionServiceModel FromConstructionUpdateViewModel(ConstructionUpdateViewModel viewModel)
        {
            var taxonomyIds = new List<long>()
                    {
                        viewModel.ConstructionTypeId, viewModel.StatusId,
                    };

            var pictureFileIds = new List<long>(viewModel.Pictures.Select(o => o.FileId));
            var detail = GetConstructionDetail(viewModel);

            var addNewpackageServiceModel = new ConstructionServiceModel()
            {
                Id = viewModel.Id,
                Name = viewModel.Title.ToEntityName(),
                Detail = detail,
                TaxonomyIds = taxonomyIds,
                AvatarFileId = viewModel.Avatar.FileId,
                PictureFileIds = pictureFileIds
            };

            return addNewpackageServiceModel;
        }
    }
}
