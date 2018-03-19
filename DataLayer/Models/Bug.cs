using System.Collections.Generic;

namespace DataLayer.Models
{
    public class Bug
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<History> Histories { get; set; }

        public Bug() { }
    }
}
