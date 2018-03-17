using Bugs.Models;
using Bugs.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.ViewModels
{
    public class HistoryVM
    {
        public int Id { get; set; }
        public int BugId { get { return VariesBug.Id; } }
        public int UserId { get { return Updater.Id; } }
        public DateTime DateUpdate { get; set; }

        /// <summary>
        /// Пользователь, который внёс изменения
        /// </summary>
        public UserVM Updater { get; set; }

        /// <summary>
        /// Баг, который подвергся изменениям
        /// </summary>
        public BugVM VariesBug { get; set; }

        public Urgency Priority { get; set; }
        public string RepoSteps { get; set; }
        public Criticality Severity { get; set; }
        public Status Status { get; set; }
        public string StatusComment { get; set; }

        public HistoryVM() { }

        public HistoryVM(History history)
        {
            if (history == null)
                return;

            Id = history.Id;
            DateUpdate = history.DateUpdate;
            Updater = new UserVM(history.Updater);
            VariesBug = new BugVM(history.VariesBug);
        }
    }
}
