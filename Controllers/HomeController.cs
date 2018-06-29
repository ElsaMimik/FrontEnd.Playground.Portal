using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using FrontEnd.Playground.Portal.Models;

namespace FrontEnd.Playground.Portal.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult CustomerService()
        {
            return View();
        }
    }
}
