using Bugs.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models
{
    public class HistoryPriority
    {
        [Key]
        [ForeignKey("History")]
        public int HistoryId { get; set; }
        public History History { get; set; }
        public Urgency Priority { get; set; }

        public HistoryPriority() { }
        public HistoryPriority(History history, Urgency priority)
        {
            History = history;
            HistoryId = history.Id;
            Priority = priority;
        }
    }
}
