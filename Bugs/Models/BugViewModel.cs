using DataLayer.Enums;
using DataLayer.Models;
using System;
using System.Collections.Generic;

namespace Bugs.Models
{
    public class BugViewModel
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public Urgency Priority { get; set; }
        public string ReproSteps { get; set; }
        public Criticality Severity { get; set; }
        public Status Status { get; set; }
        public string StatusComment { get; set; }
        public UserViewModel Creator { get; set; }
        public DateTime DateCreate { get; set; }

        public ICollection<HistoryViewModel> Histories { get; set; }

        public BugViewModel() { }

        public BugViewModel(Bug bug)
        {
            if (bug == null)
                return;

            Id = bug.Id;
            Name = bug.Name;
            Priority = bug.Priority;
            ReproSteps = bug.Description;
            Severity = bug.Severity;
            Status = bug.Status;

            Creator = new UserViewModel(bug.Creator);
            DateCreate = bug.DateCreate;
            Histories = new List<HistoryViewModel>();
        }
    }
}
