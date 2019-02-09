﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using NSwag.Annotations;

namespace Ui.Controllers
{
    [SwaggerIgnore]
    public class HomeController : Controller
    {
        [Route("~/")]
        [Route("~/Home")]
        [Route("~/Home/Index")]
        public IActionResult Index()
        {
            return View();
        }
    }
}
