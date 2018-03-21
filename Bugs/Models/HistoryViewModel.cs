using DataLayer.Enums;
using DataLayer.Models;
using System;

namespace Bugs.Models
{
    public class HistoryViewModel
    {
        public int BugId { get { return VariesBug.Id; } }
        public int UserId { get { return Updater.Id; } }
        public DateTime DateUpdate { get; set; }

        /// <summary>
        /// Пользователь, который внёс изменения
        /// </summary>
        public UserViewModel Updater { get; set; }

        /// <summary>
        /// Баг, который подвергся изменениям
        /// </summary>
        public BugViewModel VariesBug { get; set; }

        public Status Status { get; set; }
        public string StatusComment { get; set; }

        public HistoryViewModel() { }

        public HistoryViewModel(History history)
        {
            if (IsNullHistory(history))
                return;

            Updater = new UserViewModel(history.Updater);
            VariesBug = new BugViewModel(history.VariesBug);
        }

        public HistoryViewModel(History history, BugViewModel bugModel)
        {
            if (IsNullHistory(history))
                return;

            Updater = new UserViewModel(history.Updater);
            VariesBug = bugModel;
        }

        public HistoryViewModel(History history, UserViewModel user, BugViewModel bugModel)
        {
            if (IsNullHistory(history))
                return;

            Updater = user;
            VariesBug = bugModel;
        }

        private bool IsNullHistory(History history)
        {
            bool res = history == null;
            if (!res)
            {
                DateUpdate = history.DateUpdate;
                Status = history.NewStatus;
                StatusComment = history.Comment;
            }
            return res;
        }
    }
}
