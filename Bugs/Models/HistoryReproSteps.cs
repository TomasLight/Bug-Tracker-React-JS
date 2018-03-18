using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models
{
    public class HistoryReproSteps
    {
        [Key]
        [ForeignKey("History")]
        public int HistoryId { get; set; }
        public History History { get; set; }
        public string Description { get; set; }

        public HistoryReproSteps() { }
        public HistoryReproSteps(History history, string description)
        {
            History = history;
            HistoryId = history.Id;
            Description = description;
        }
    }
}
