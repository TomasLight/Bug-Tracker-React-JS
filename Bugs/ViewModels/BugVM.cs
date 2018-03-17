using Bugs.Models;
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
