using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Bugs.Models;
using Bugs.Models.Reposotories.Api;
using Bugs.Models.Context;
using Bugs.Models.Reposotories.Impl;

namespace Bugs.Controllers
{
    public class HomeController : Controller
    {
        private readonly IRepositoryFacade _repository;

        public HomeController(IRepositoryFacade repository)
        {
            _repository = repository;
        }

        public IActionResult Index()
        {
            return View(_repository.Bugs().Get());
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }


    }
}
