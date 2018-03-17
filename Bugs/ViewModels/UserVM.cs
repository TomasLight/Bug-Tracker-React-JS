using Bugs.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.ViewModels
{
    public class UserVM
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }

        public ICollection<HistoryVM> Histories { get; set; }

        public UserVM() { }

        public UserVM(User user)
        {
            if (user == null)
                return;

            Id = user.Id;
            Login = user.Login;
            Password = user.Password;
            LastName = user.LastName;
            FirstName = user.FirstName;

            Histories = new List<HistoryVM>();
        }
    }
}
