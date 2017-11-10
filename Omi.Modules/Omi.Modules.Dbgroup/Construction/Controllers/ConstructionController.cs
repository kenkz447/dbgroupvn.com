using Omi.Modules.ModuleBase;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Identity;
using Omi.Data;
using Omi.Modules.Dbgroup.Construction.Services;

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
    }
}