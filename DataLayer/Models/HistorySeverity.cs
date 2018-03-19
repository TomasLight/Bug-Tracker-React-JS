using DataLayer.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Models
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
