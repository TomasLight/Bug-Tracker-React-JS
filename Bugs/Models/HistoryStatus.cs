using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Bugs.Models.Enums;

namespace Bugs.Models
{
    public class HistoryStatus
    {
        [Key]
        [ForeignKey("History")]
        public int HistoryId { get; set; }
        public History History { get; set; }
        public Status Status { get; set; }
        public string Comment { get; set; }

        public HistoryStatus() { }

        public HistoryStatus(History history, Status status, string comment)
        {
            History = history;
            HistoryId = history.Id;
            Status = status;
            Comment = comment;
        }
    }
}
