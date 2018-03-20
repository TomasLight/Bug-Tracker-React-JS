using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Models
{
    public class Bug
    {
        public int Id { get; set; }
        [NotMapped]
        internal string Name { get; set; }

        public ICollection<History> Histories { get; set; }

        public Bug() { }
    }
}
