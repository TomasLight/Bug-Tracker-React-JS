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
                HistoryStatus status = _repository.Statuses().Get(history.Id);
                if (status != null)
                {
                    bugVM.Status = status.Status;
                    bugVM.StatusComment = status.Comment;
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
            return View();
        }

        [HttpGet]
        public IEnumerable<BugViewModel> Get()
        {
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
    }
}
