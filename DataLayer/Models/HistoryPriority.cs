using DataLayer.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Models
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
