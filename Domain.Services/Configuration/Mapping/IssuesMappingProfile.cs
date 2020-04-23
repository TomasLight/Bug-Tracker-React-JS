using AutoMapper;

namespace Domain.Services.Configuration.Mapping
{
	public class IssuesMappingProfile : Profile
	{
		public IssuesMappingProfile()
		{
			CreateMap<Data.Issues.Issue, Domain.Issues.Issue>();
			CreateMap<Domain.Issues.Issue, Data.Issues.Issue>();
		}
	}
}