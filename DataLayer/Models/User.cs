using System.Collections.Generic;

namespace DataLayer.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }

        public ICollection<History> Histories { get; set; }

        public User() { }
    }
}
