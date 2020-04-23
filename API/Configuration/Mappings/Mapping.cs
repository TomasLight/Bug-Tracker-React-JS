using AutoMapper;

namespace API.Configuration.Mappings
{
	internal static class Mapping
	{
		public static IMapper CreateMapper()
		{
			var config = new MapperConfiguration(configuration =>
			{
				Domain.Services.Configuration.MappingConfigurator.AddServiceProfiles(configuration);

				configuration.AddProfile<UsersMappingProfile>();
				configuration.AddProfile<IssuesMappingProfile>();
			});

			return config.CreateMapper();
		} 
	}
}