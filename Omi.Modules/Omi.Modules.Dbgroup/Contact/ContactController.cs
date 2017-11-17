using Omi.Modules.ModuleBase;
using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.Logging;
using Omi.Base;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Omi.Modules.Dbgroup.Contact
{
    public class ContactController : BaseController
    {
        public ContactController(ILogger<ContactController> logger) : base(logger)
        {

        }

        [AllowAnonymous]
        public BaseJsonResult Send([FromBody]ContactViewModel viewModel)
        {
            return new BaseJsonResult(Base.Properties.Resources.POST_SUCCEEDED);
        }
    }
}
