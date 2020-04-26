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
				Id = (int)FakeUserId.ChristopherEccleston,
				Login = "user1",
				Password = FakePassword,
				FirstName = "Christopher",
				LastName = "Eccleston",
			},
			new User
			{
				Id = (int)FakeUserId.ElisabethSonrel,
				Login = "user2",
				Password = FakePassword,
				FirstName = "Elisabeth",
				LastName = "Sonrel",
			},
			new User
			{
				Id = (int)FakeUserId.JeanneMoreau,
				Login = "user3",
				Password = FakePassword,
				FirstName = "Jeanne",
				LastName = "Moreau",
			},
			new User
			{
				Id = (int)FakeUserId.MichaelCrawford,
				Login = "user4",
				Password = FakePassword,
				FirstName = "Michael",
				LastName = "Crawford",
			},
			new User
			{
				Id = (int)FakeUserId.MorizHeider,
				Login = "user5",
				Password = FakePassword,
				FirstName = "Moriz",
				LastName = "Heider",
			},
			new User
			{
				Id = (int)FakeUserId.TomasLight,
				Login = "user6",
				Password = FakePassword,
				FirstName = "Tomas",
				LastName = "Light",
			},
		};
		
		public Task<IEnumerable<User>> GetAsync()
		{
			return Task.FromResult(_users.AsEnumerable());
		}
	}
}