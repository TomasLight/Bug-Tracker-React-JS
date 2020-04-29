using System.Collections.Generic;
using Domain.Histories;

namespace Domain.Users
{
	public class User : IDomainModel
	{
		public int Id { get; set; }
		
		public string Login { get; set; }
		
		public string Password { get; set; }
		
		public string LastName { get; set; }
		
		public string FirstName { get; set; }
		
		public string Avatar { get; set; }

		public virtual ICollection<History> Histories { get; set; }
	}
}