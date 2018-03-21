using DataLayer.Models;
using System.Collections.Generic;

namespace Bugs.Models
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string Login { get; set; }
        public string Password { get; set; }
        public string LastName { get; set; }
        public string FirstName { get; set; }

        //public ICollection<HistoryViewModel> Histories { get; set; }

        public UserViewModel() { }

        public UserViewModel(User user)
        {
            if (user == null)
                return;

            Id = user.Id;
            Login = user.Login;
            Password = user.Password;
            LastName = user.LastName;
            FirstName = user.FirstName;

            //Histories = new List<HistoryViewModel>();
        }
    }
}
