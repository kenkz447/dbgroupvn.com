using Omi.Modules.ModuleBase;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using Omi.Data;
using Omi.Modules.Dbgroup.Services;
using Microsoft.AspNetCore.Authorization;
using Omi.Base;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Omi.Modules.Dbgroup.Construction.Entities;
using System.Linq;
using Omi.Modules.ModuleBase.ViewModels;
using Omi.Modules.Dbgroup.ViewModels;
using Omi.Base.ViewModel;
using Omi.Modules.Dbgroup.ServiceModels;
using Omi.Modules.FileAndMedia.Base;
using Omi.Modules.FileAndMedia.ViewModel;
using Omi.Modules.Dbgroup.Construction.Seed;

namespace Omi.Modules.Dbgroup.Construction.Controllers
{
    public class ConstructionController : BaseController
    {
        private readonly ConstructionService _constructionService;

        public ConstructionController(
            ConstructionService constructionService,
            UserManager<ApplicationUser> userManager,
            ILogger<ConstructionController> logger) : base(logger, userManager)
        {
            _constructionService = constructionService;
        }

        private ConstructionViewModel EmptyConstructionViewModel
        {
            get
            {
                var designThemes = _constructionService.GetAllDesignThemes();

                var result = new ConstructionViewModel
                {
                    AvaliableDesignThemes = designThemes.Select(o => TaxomonyViewModel.FromEntity(o))
                };

                return result;
            }
        }

        public BaseJsonResult GetEmptyConstructionViewModel()
            => new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED, EmptyConstructionViewModel);

        public async Task<BaseJsonResult> GetConstructionViewModel(long constructionId)
        {
            var construction = await _constructionService.GetConstructionById(constructionId);
            var viewModel = ToConstructionViewModel(construction);
            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, viewModel);
        }

        [AllowAnonymous]
        public async Task<BaseJsonResult> GetNextAndPrevConstruction(long constructionId)
        {
            var nextConstruction = await _constructionService.GetNextConstruction(constructionId);
            var prevConstruction = await _constructionService.GetPrevConstruction(constructionId);

            var next = ToConstructionViewModel(nextConstruction);
            var prev = ToConstructionViewModel(prevConstruction);
            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, new { next, prev });
        }

        [AllowAnonymous]
        public async Task<BaseJsonResult> GetConstruction(long constructionName)
        {
            var construction = await _constructionService.GetConstructionById(constructionName);
            var viewModel = ToConstructionViewModel(construction);
            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, viewModel);
        }

        [AllowAnonymous]
        public async Task<BaseJsonResult> GetConstructions(ConstructionFilterViewModel viewModel)
        {
            var serviceModel = viewModel.ToServiceModel();
            var entities = await _constructionService.GetConstructions(serviceModel);

            var viewModels = new PageEntityViewModel<ConstructionEntity, ConstructionViewModel>(entities, o => ToConstructionViewModel(o));

            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, viewModels);
        }

        [HttpPost]
        public async Task<BaseJsonResult> CreateNewConstruction([FromBody]ConstructionUpdateViewModel viewModel)
        {
            var constructionServiceModel = ConstructionServiceModelExt.FromConstructionUpdateViewModel(viewModel);
            constructionServiceModel.User = CurrentUser;

            var newConstruction = await _constructionService.CreateNewConstruction(constructionServiceModel);

            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, newConstruction.Id);
        }

        [HttpPost]
        public async Task<BaseJsonResult> UpdateConstruction([FromBody]ConstructionUpdateViewModel viewModel)
        {
            if (!ModelState.IsValid)
                return new ModelStateErrorJsonResult(ModelState.Values);

            var constructionServiceModel = ConstructionServiceModelExt.FromConstructionUpdateViewModel(viewModel);
            constructionServiceModel.User = CurrentUser;

            await _constructionService.UpdateConstructionAsync(constructionServiceModel);

            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED);
        }

        private ConstructionViewModel ToConstructionViewModel(ConstructionEntity construction)
        {
            if (construction == null)
                return null;

            var constructionViewModel = EmptyConstructionViewModel;

            constructionViewModel.Id = construction.Id;

            var detail = construction.Details.FirstOrDefault();

            var avatarFile = construction.EnitityFiles.FirstOrDefault(o => o.UsingType == (int)FileUsingType.Avatar);
            constructionViewModel.Avatar = FileEntityInfo.FromEntity(avatarFile.FileEntity);

            var pictureFiles = construction.EnitityFiles.Where(o => o.UsingType == (int)FileUsingType.Picture);
            constructionViewModel.Pictures = pictureFiles.Select(o => FileEntityInfo.FromEntity(o.FileEntity));

            var houseType = construction.EntityTaxonomies.FirstOrDefault(o => o.Taxonomy.TaxonomyTypeId == ConstructionTaxonomiesSeed.ConstructionType.Id);
            constructionViewModel.HouseTypeId = houseType.TaxonomyId;
            constructionViewModel.HouseTypeLabel = houseType.Taxonomy.Details.FirstOrDefault(o => o.Language == Omi.Base.Properties.Resources.DEFAULT_LANGUAGE).Label;

            return constructionViewModel;
        }
    }
}