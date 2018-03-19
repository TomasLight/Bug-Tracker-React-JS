using DataLayer.Enums;
using DataLayer.Models;
using System;

namespace Bugs.Models
{
    public class HistoryViewModel
    {
        public int Id { get; set; }
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

        public Urgency? Priority { get; set; }
        public string ReproSteps { get; set; }
        public Criticality? Severity { get; set; }
        public Status? Status { get; set; }
        public string StatusComment { get; set; }

        public HistoryViewModel() { }

        public HistoryViewModel(History history)
        {
            if (history == null)
                return;

            Id = history.Id;
            DateUpdate = history.DateUpdate;
            Updater = new UserViewModel(history.Updater);
            VariesBug = new BugViewModel(history.VariesBug);
        }
    }
}
