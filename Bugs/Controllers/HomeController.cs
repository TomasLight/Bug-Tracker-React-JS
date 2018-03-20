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

            BugViewModel bugVM = GetFullBugInfo(bug);
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
                BugViewModel shortBugInfo = GetShortBugInfo(bug);
                if(shortBugInfo != null)
                    viewModelList.Add(shortBugInfo);
            }
            return viewModelList;
        }

        private BugViewModel GetShortBugInfo(Bug bug)
        {
            if (bug == null)
                return null;

            BugViewModel bugVM = new BugViewModel(bug);
            IEnumerable<History> bugHistoryList = _repository.Histories().GetBugHistories(bug.Id);
            foreach (History history in bugHistoryList)
            {
                HistoryStatus hStatus = _repository.Statuses().Get(history.Id);
                if (hStatus != null)
                {
                    bugVM.Status = hStatus.Status;
                    bugVM.StatusComment = hStatus.Comment;
                }

                HistoryName hName = _repository.Names().Get(history.Id);
                if (hName != null)
                {
                    bugVM.Name = hName.Name;
                }
            }
            return bugVM;
        }

        private BugViewModel GetFullBugInfo(Bug bug)
        {
            if (bug == null)
                return null;

            BugViewModel bugVM = new BugViewModel(bug);
            IEnumerable<History> bugHistoryList = _repository.Histories().GetBugHistories(bug.Id);
            foreach (History history in bugHistoryList.OrderBy(bhl => bhl.DateUpdate))
            {
                HistoryViewModel hVM = new HistoryViewModel(history);

                HistoryName hName = _repository.Names().Get(history.Id);
                if (hName != null)
                {
                    hVM.Name = hName.Name;
                    bugVM.Name = hName.Name;
                }

                HistoryStatus status = _repository.Statuses().Get(history.Id);
                if (status != null)
                {
                    hVM.Status = status.Status;
                    hVM.StatusComment = status.Comment;
                    bugVM.Status = status.Status;
                    bugVM.StatusComment = status.Comment;
                }

                HistoryPriority priority = _repository.Priorities().Get(history.Id);
                if (priority != null)
                {
                    hVM.Priority = priority.Priority;
                    bugVM.Priority = priority.Priority;
                }

                HistorySeverity severity = _repository.Severities().Get(history.Id);
                if (severity != null)
                {
                    hVM.Severity = severity.Severity;
                    bugVM.Severity = severity.Severity;
                }

                HistoryReproSteps repoSteps = _repository.RepoSteps().Get(history.Id);
                if (repoSteps != null)
                {
                    hVM.ReproSteps = repoSteps.Description;
                    bugVM.ReproSteps = repoSteps.Description;
                }

                bugVM.Histories.Add(hVM);
            }
            return bugVM;
        }

        // react

        public IActionResult Bugs()
        {
            if (!HttpContext.Session.Keys.Contains("ActualPage"))
                HttpContext.Session.SetString("ActualPage", "BugList");

            return View();
        }

        [HttpGet]
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
                    default: // BugList
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

        [HttpGet]
        public IEnumerable<BugViewModel> Get()
        {
            HttpContext.Session.SetString("ActualPage", "BugList");
            return GetBugList();
        }
        
        [HttpGet]
        public Array GetStatusNames()
        {
            return Enum.GetNames(typeof(Status));
        }

        [HttpGet]
        public Array GetStatusValues()
        {
            return Enum.GetValues(typeof(Status));
        }

        [HttpGet]
        public BugViewModel VariesBug(int bugId)
        {
            HttpContext.Session.SetString("ActualPage", "VariesBug");
            HttpContext.Session.SetString("bugId", bugId.ToString());

            Bug bug = _repository.Bugs().Get(bugId);
            if (bug == null)
                return null;

            BugViewModel bugVM = GetFullBugInfo(bug);
            return bugVM;
        }

        [HttpPost]
        public bool SaveBug(BugViewModel oldModel, BugViewModel newModel)
        {
            Bug editableBug = _repository.Bugs().Get(oldModel.Id);
            if (editableBug == null)
                return false;

            History history = new History(_currentUser, editableBug, DateTime.Now);
            _repository.Histories().Add(history);

            if (newModel.Name != oldModel.Name)
            {
                _repository.Names().Add(new HistoryName(history, newModel.Name));
            }

            if (newModel.Priority != oldModel.Priority)
            {
                _repository.Priorities().Add(new HistoryPriority(history, newModel.Priority));
            }

            if (newModel.ReproSteps != oldModel.ReproSteps)
            {
                _repository.RepoSteps().Add(new HistoryReproSteps(history, newModel.ReproSteps));
            }

            if (newModel.Severity != oldModel.Severity)
            {
                _repository.Severities().Add(new HistorySeverity(history, newModel.Severity));
            }

            if (newModel.Status != oldModel.Status)
            {
                _repository.Statuses().Add(new HistoryStatus(history, newModel.Status, newModel.StatusComment));
            }

            return true;
        }
    }
}
