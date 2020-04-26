using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Users;
using Data.Users;
using Domain.Exceptions;
using User = Domain.Users.User;

namespace Domain.Services
{
	public class UserService : IUserService
	{
		private readonly IMapper _mapper;
		private readonly IUserRepository _userRepository;
		
		public UserService(IMapper mapper, IUserRepository userRepository)
		{
			_mapper = mapper;
			_userRepository = userRepository;
		}
		
		public async Task<IList<User>> GetAsync()
		{
			var users = await GetUsersAsync();
			return users.ToList();
		}
		
		public async Task<User> GetByIdAsync(int userId)
		{
			var userEntity = await _userRepository.GetByIdAsync(userId);
			if (userEntity == null)
			{
				throw new NotFoundException();
			}
			return _mapper.Map<User>(userEntity);
		}

		public async Task<User> GetByLoginAndPasswordAsync(string login, string password)
		{
			var users = await GetUsersAsync();
			return users.FirstOrDefault(user => 
				user.Login.Equals(login) && 
				user.Password.Equals(password) // here must be password converting to hash or something else
			);
		}

		private async Task<IEnumerable<User>> GetUsersAsync()
		{
			var userEntities = await _userRepository.GetAsync();
			return userEntities.Select(_mapper.Map<User>);
		}
	}
}