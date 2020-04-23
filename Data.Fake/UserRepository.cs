using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Users;

namespace Data.Fake
{
	public class UserRepository : IUserRepository
	{
		private static readonly string FakePassword = "!23Qwe"; // here should be hash
		
		private static List<User> _users = new List<User>
		{
			new User
			{
				Id = (int)FakeUserId.Admin,
				Login = "admin",
				Password = FakePassword,
				FirstName = "Admin",
				LastName = "Test",
			},
			new User
			{
				Id = (int)FakeUserId.Manager,
				Login = "manager",
				Password = FakePassword,
				FirstName = "Manager",
				LastName = "Test",
			},
			new User
			{
				Id = (int)FakeUserId.Developer,
				Login = "developer",
				Password = FakePassword,
				FirstName = "Developer",
				LastName = "Test",
			},
			new User
			{
				Id = (int)FakeUserId.QA,
				Login = "qa",
				Password = FakePassword,
				FirstName = "QA",
				LastName = "Test",
			},
		};
		
		public Task<IEnumerable<User>> GetAsync()
		{
			return Task.FromResult(_users.AsEnumerable());
		}
	}
}