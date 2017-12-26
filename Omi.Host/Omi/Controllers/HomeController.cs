using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Wangkanai.Detection;

namespace Omi.Controllers
{
    public class HomeController : Controller
    {
        private readonly IDevice _device;

        public HomeController(IDeviceResolver deviceResolver)
        {
            _device = deviceResolver.Device;
        }

        public IActionResult Index ()
        {
            if (_device.Type == DeviceType.Desktop)
                return File("~index.html", "text/html");

            Response.Headers.Add("Content-Encoding", "gzip");
            return File("~index.html.gz", "text/html");
        }
    }
}