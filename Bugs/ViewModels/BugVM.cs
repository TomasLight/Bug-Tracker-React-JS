using Bugs.Models;
using Bugs.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.ViewModels
{
    public class BugVM
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public Urgency Priority { get; set; }
        public string ReproSteps { get; set; }
        public Criticality Severity { get; set; }
        public Status Status { get; set; }
        public string StatusComment { get; set; }

        public ICollection<HistoryVM> Histories { get; set; }

        public BugVM() { }

        public BugVM(Bug bug)
        {
            if (bug == null)
                return;

            Id = bug.Id;
            Name = bug.Name;
            Histories = new List<HistoryVM>();
        }
    }
}
