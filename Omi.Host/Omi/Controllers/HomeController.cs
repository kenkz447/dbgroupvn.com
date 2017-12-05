using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Omi.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index ()
        {
            Response.Headers.Add("Content-Encoding", "gzip");
            return File("~index.html.gz", "text/html");
        }
    }
}