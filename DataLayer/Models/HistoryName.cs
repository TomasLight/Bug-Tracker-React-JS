using DataLayer.Enums;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Models
{
    public class HistoryName
    {
        [Key]
        [ForeignKey("History")]
        public int HistoryId { get; set; }
        public History History { get; set; }
        public string Name { get; set; }

        public HistoryName() { }
        public HistoryName(History history, string name)
        {
            History = history;
            HistoryId = history.Id;
            Name = name;
        }
    }
}
