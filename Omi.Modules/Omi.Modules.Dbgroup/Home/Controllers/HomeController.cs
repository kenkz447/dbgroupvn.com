using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Logging;
using Omi.Base;
using Omi.Data;
using Omi.Modules.Dbgroup.Home.ServiceModels;
using Omi.Modules.Dbgroup.Home.Services;
using Omi.Modules.Dbgroup.Home.ViewModels;
using Omi.Modules.ModuleBase;
using System.Threading.Tasks;

namespace Omi.Modules.Dbgroup.Home.Controllers
{
    public class HomeController : BaseController
    {
        public readonly HomeService _homeService;
        public HomeController(
            HomeService homeService,
            ILogger logger, 
            UserManager<ApplicationUser> userManager) : base(logger, userManager)
        {
            _homeService = homeService;
        }

        public async Task<BaseJsonResult> UpdateSetting(HomeSettingViewModel viewModel)
        {
            var updateHomeSettingServiceModel = UpdateHomeSettingServiceModelExt.FromViewModel(viewModel);
            updateHomeSettingServiceModel.UpdateBy = CurrentUser;

            await _homeService.UpdateSetting(updateHomeSettingServiceModel);

            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED);
        }

        [AllowAnonymous]
        public async Task<BaseJsonResult> GetSetting()
        {
            var homeSettingEntity = await _homeService.GetSetting();
            var viewModel = HomeSettingViewModelExt.FromEntity(homeSettingEntity);
            return new BaseJsonResult(Omi.Base.Properties.Resources.POST_SUCCEEDED, viewModel);
        }
    }
}