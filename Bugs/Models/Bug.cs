using Bugs.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models
{
    public class Bug
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<History> Histories { get; set; }

        public Bug() { }
    }
}
