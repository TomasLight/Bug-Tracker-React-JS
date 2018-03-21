using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Bugs.Models;
using Microsoft.AspNetCore.Mvc.Rendering;
using DataLayer.Enums;
using DataLayer.Models;
using DataLayer.Reposotories.Api;
using Microsoft.AspNetCore.Http;

namespace Bugs.Controllers
{
    public class HomeController : Controller
    {
        private readonly IRepositoryFacade _repository;

        private User _currentUser;

        public HomeController(IRepositoryFacade repository)
        {
            _repository = repository;
            _currentUser = _repository.Users().Get().FirstOrDefault();
        }

        public IActionResult Index()
        {
            return RedirectToAction(nameof(Bugs));
            //return View(GetBugList());
        }

        public IActionResult EditBug(int bugId)
        {
            Bug bug = _repository.Bugs().Get(bugId);
            if (bug == null)
                return View(null);

            ViewData["Status"] = new SelectList(Enum.GetValues(typeof(Status)));
            ViewData["Priority"] = new SelectList(Enum.GetValues(typeof(Urgency)));
            ViewData["Severity"] = new SelectList(Enum.GetValues(typeof(Criticality)));

            BugViewModel bugVM = GetBugInfo(bug);
            return View(bugVM);
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        private IEnumerable<BugViewModel> GetBugList()
        {
            List<BugViewModel> viewModelList = new List<BugViewModel>();

            IEnumerable<Bug> bugList = _repository.Bugs().Get();
            foreach(Bug bug in bugList)
            {
                BugViewModel shortBugInfo = new BugViewModel(bug);
                if(shortBugInfo != null)
                    viewModelList.Add(shortBugInfo);
            }
            return viewModelList;
        }
        
        private BugViewModel GetBugInfo(Bug bug)
        {
            if (bug == null)
                return null;

            BugViewModel bugVM = new BugViewModel(bug);

            IEnumerable<History> bugHistoryList = _repository.Histories().GetBugHistories(bug.Id).OrderBy(bhl => bhl.DateUpdate);
            foreach (History history in bugHistoryList)
                bugVM.Histories.Add(new HistoryViewModel(history, bugVM));

            return bugVM;
        }

        // react

        public IActionResult Bugs()
        {
            if (!HttpContext.Session.Keys.Contains("ActualPage"))
                HttpContext.Session.SetString("ActualPage", "BugList");

            return View();
        }

        public JsonResult GetActualPage()
        {
            string actualPage;
            if (HttpContext.Session.Keys.Contains("ActualPage"))
            {
                actualPage = HttpContext.Session.GetString("ActualPage");
                switch (actualPage)
                {
                    case "VariesBug":
                        string bugId = HttpContext.Session.GetString("bugId");
                        return Json(new { actualPage, bugId });

                    // BugList
                    default:
                        return Json(actualPage);
                }
            }
            else
            {
                actualPage = "BugList";
                HttpContext.Session.SetString("ActualPage", actualPage);

                return Json(actualPage);
            }
        }

        public IEnumerable<BugViewModel> Get()
        {
            HttpContext.Session.SetString("ActualPage", "BugList");
            return GetBugList();
        }
        
        public Array GetStatusNames()
        {
            return Enum.GetNames(typeof(Status));
        }

        public Array GetStatusValues()
        {
            return Enum.GetValues(typeof(Status));
        }

        public BugViewModel VariesBug(int bugId)
        {
            HttpContext.Session.SetString("ActualPage", "VariesBug");
            HttpContext.Session.SetString("bugId", bugId.ToString());

            Bug bug = _repository.Bugs().Get(bugId);
            if (bug == null)
                return null;

            //BugViewModel bugVM = GetBugInfo(bug);
            BugViewModel bugVM = new BugViewModel(bug);
            return bugVM;
        }

        public List<HistoryViewModel> BugHistories(int bugId)
        {
            List<HistoryViewModel> model = new List<HistoryViewModel>();
            IEnumerable<History> bugHistoryList = _repository.Histories()
                                                             .GetBugHistories(bugId)
                                                             .OrderBy(bhl => bhl.DateUpdate);
            foreach (History history in bugHistoryList)
                model.Add(new HistoryViewModel(history));

            return model;
        }

        [HttpPost]
        public bool SaveBug(BugViewModel model)
        {
            Bug editableBug = _repository.Bugs().Get(model.Id);
            if (editableBug == null)
                return false;

            editableBug.Name = model.Name;
            editableBug.Description = model.ReproSteps;
            editableBug.Priority = model.Priority;
            editableBug.Severity = model.Severity;
            editableBug.Status = model.Status;
            _repository.Bugs().Update(editableBug);

            History history = new History(_currentUser, editableBug, DateTime.Now, model.Status, model.StatusComment);
            _repository.Histories().Add(history);
            
            return true;
        }
    }
}
