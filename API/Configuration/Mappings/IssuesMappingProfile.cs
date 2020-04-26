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
				)
				.ForMember(
					dto => dto.AssignedUserId,
					opt => opt.MapFrom(issue => issue.Assigned.Id)
				);

			CreateMap<NewIssueDto, Issue>();
			CreateMap<UpdateIssueDto, Issue>();
		}
	}
}