using Bugs.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models
{
    public class HistorySeverity
    {
        [Key]
        [ForeignKey("History")]
        public int HistoryId { get; set; }
        public History History { get; set; }
        public Criticality Severity { get; set; }

        public HistorySeverity() { }
        public HistorySeverity(History history, Criticality severity)
        {
            History = history;
            HistoryId = history.Id;
            Severity = severity;
        }
    }
}
