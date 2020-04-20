using API.Models.Issues.Requests;
using API.Models.Issues.Responses;
using AutoMapper;
using Domain.Issues;

namespace API.Configuration.Mappings
{
	public class IssuesMappingProfile : Profile
	{
		public IssuesMappingProfile()
		{
			CreateMap<Issue, IssueDto>()
				.ForMember(
					dto => dto.ReporterId,
					opt => opt.MapFrom(issue => issue.Reporter.Id)
					);

			CreateMap<NewIssueDto, Issue>();
			CreateMap<UpdateIssueDto, Issue>();
		}
	}
}