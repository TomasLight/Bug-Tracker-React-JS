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
using Bugs.ViewModels;

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
            //return View(_repository.Bugs().Get());
            return View(GetBugVMList());
        }

        public IActionResult EditBug(int bugId)
        {
            //return View(_bugVMList.FirstOrDefault(b => b.Id == bugId));
            Bug bug = _repository.Bugs().Get(bugId);
            if (bug == null)
                return View(null);

            BugVM bugVM = GetBugVM(bug);
            return View(bugVM);
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        //private List<BugVM> _bugVMList = new List<BugVM>();
        private IEnumerable<BugVM> GetBugVMList()
        {
            List<BugVM> bugVMList = new List<BugVM>();

            IEnumerable<Bug> bugList = _repository.Bugs().Get();
            foreach(Bug bug in bugList)
            {
                BugVM bugVM = GetBugVM(bug);
                bugVMList.Add(bugVM);
            }
            return bugVMList;
        }

        private BugVM GetBugVM(Bug bug)
        {
            BugVM bugVM = new BugVM(bug);
            IEnumerable<History> bugHistoryList = _repository.Histories().GetBugHistories(bug.Id);
            foreach (History history in bugHistoryList)
            {
                HistoryStatus status = _repository.Statuses().Get(history.Id);
                HistoryVM hVM = new HistoryVM(history);
                hVM.Status = status.Status;
                hVM.StatusComment = status.Comment;
                bugVM.Histories.Add(hVM);
            }
            return bugVM;
        }
    }
}
