using AutoMapper;
using Domain.Services.Configuration.Mapping;

namespace Domain.Services.Configuration
{
	public class MappingConfigurator
	{
		public static void AddServiceProfiles(IMapperConfigurationExpression configuration)
		{
			configuration.AddProfile<UserMappingProfile>();
			configuration.AddProfile<IssuesMappingProfile>();
			configuration.AddProfile<HistoryMappingProfile>();
		}
	}
}