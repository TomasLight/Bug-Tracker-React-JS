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
        }

        public IActionResult Bugs()
        {
            if (!HttpContext.Session.Keys.Contains("ActualPage"))
                HttpContext.Session.SetString("ActualPage", "BugList");

            return View();
        }

        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        #region for react queries

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

                    case "EditUser":
                        string userId = HttpContext.Session.GetString("userId");
                        return Json(new { actualPage, userId });

                    // BugList, NewBug, UserList, NewUser
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

        #region bugs

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
            if (bugId == 0)
                return NewBug();

            HttpContext.Session.SetString("ActualPage", "VariesBug");
            HttpContext.Session.SetString("bugId", bugId.ToString());

            Bug bug = _repository.Bugs().Get(bugId);
            if (bug == null)
                return null;

            BugViewModel bugVM = new BugViewModel(bug);
            return bugVM;
        }

        public BugViewModel NewBug()
        {
            HttpContext.Session.SetString("ActualPage", "NewBug");

            BugViewModel bugVM = new BugViewModel();
            bugVM.Creator = new UserViewModel(_currentUser);
            bugVM.DateCreate = DateTime.Now;
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
        public void SaveBug(BugViewModel model)
        {
            if (model.Id == 0)
                AddBug(model);
            else
                UpdateBug(model);
        }

        #endregion

        #region users
        
        public IEnumerable<UserViewModel> GetUsers()
        {
            HttpContext.Session.SetString("ActualPage", "UserList");
            return GetUserList();
        }
        
        public UserViewModel EditUser(int userId)
        {
            if (userId == 0)
                return NewUser();

            HttpContext.Session.SetString("ActualPage", "EditUser");
            HttpContext.Session.SetString("userId", userId.ToString());

            User user = _repository.Users().Get(userId);
            if (user == null)
                return null;

            UserViewModel userVM = new UserViewModel(user);
            return userVM;
        }

        public UserViewModel NewUser()
        {
            HttpContext.Session.SetString("ActualPage", "NewUser");

            UserViewModel userVM = new UserViewModel();
            return userVM;
        }

        [HttpPost]
        public void SaveUser(UserViewModel model)
        {
            if (model.Id == 0)
                AddUser(model);
            else
                UpdateUser(model);
        }

        #endregion

        #endregion

        #region data handlers

        #region bugs

        private IEnumerable<BugViewModel> GetBugList()
        {
            List<BugViewModel> viewModelList = new List<BugViewModel>();

            IEnumerable<Bug> bugList = _repository.Bugs().Get();
            foreach (Bug bug in bugList)
            {
                BugViewModel shortBugInfo = new BugViewModel(bug);
                if (shortBugInfo != null)
                    viewModelList.Add(shortBugInfo);
            }
            return viewModelList;
        }

        private void AddBug(BugViewModel model)
        {
            Bug newBug = new Bug();
            newBug.Set(model);

            newBug.Creator = _repository.Users().Get(model.Creator.Id);
            newBug.DateCreate = model.DateCreate;
            _repository.Bugs().Add(newBug);

            History history = new History(_currentUser, newBug, DateTime.Now, model.Status, "");
            _repository.Histories().Add(history);
        }

        private void UpdateBug(BugViewModel model)
        {
            Bug updatedBug = _repository.Bugs().Get(model.Id);
            if (updatedBug == null)
                return;

            updatedBug.Set(model);
            _repository.Bugs().Update(updatedBug);

            History history = new History(_currentUser, updatedBug, DateTime.Now, model.Status, model.StatusComment);
            _repository.Histories().Add(history);
        }

        #endregion

        #region users
        
        private IEnumerable<UserViewModel> GetUserList()
        {
            List<UserViewModel> viewModelList = new List<UserViewModel>();

            IEnumerable<User> userList = _repository.Users().Get();
            foreach (User bug in userList)
            {
                UserViewModel userInfo = new UserViewModel(bug);
                if (userInfo != null)
                    viewModelList.Add(userInfo);
            }
            return viewModelList;
        }

        private void AddUser(UserViewModel model)
        {
            User newUser = new User();
            newUser.Set(model);
            newUser.Login = model.Login;
            newUser.Password = model.Password;
            _repository.Users().Add(newUser);
        }

        private void UpdateUser(UserViewModel model)
        {
            User updatedUser = _repository.Users().Get(model.Id);
            if (updatedUser == null)
                return;

            updatedUser.Set(model);
            if(model.Password != null && model.Password != "")
                updatedUser.Password = model.Password;

            _repository.Users().Update(updatedUser);
        }

        #endregion

        #endregion
    }

    internal static class LocalExtenssions
    {
        internal static Bug Set(this Bug bug, BugViewModel model)
        {
            bug.Name = model.Name;
            bug.Description = model.ReproSteps;
            bug.Priority = model.Priority;
            bug.Severity = model.Severity;
            bug.Status = model.Status;

            return bug;
        }

        internal static User Set(this User user, UserViewModel model)
        {
            user.FirstName = model.FirstName;
            user.LastName = model.LastName;
            return user;
        }
    }
}
