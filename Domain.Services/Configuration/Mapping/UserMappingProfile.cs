using AutoMapper;

namespace Domain.Services.Configuration.Mapping
{
	public class UserMappingProfile : Profile
	{
		public UserMappingProfile()
		{
			CreateMap<Data.Users.User, Domain.Users.User>();
			CreateMap<Domain.Users.User, Data.Users.User>();
		}
	}
}