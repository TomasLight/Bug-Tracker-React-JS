using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.Users
{
	public interface IUserRepository
	{
		Task<IEnumerable<User>> GetAsync();
		
		Task<User> GetByIdAsync(int userId);
	}
}