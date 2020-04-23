using API.Models.Users.Responses;
using AutoMapper;
using Domain.Users;

namespace API.Configuration.Mappings
{
	public class UsersMappingProfile : Profile
	{
		public UsersMappingProfile()
		{
			CreateMap<User, UserDto>();
		}
	}
}