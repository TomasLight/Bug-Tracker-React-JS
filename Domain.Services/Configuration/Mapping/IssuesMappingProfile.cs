using AutoMapper;
using Domain.Users;

namespace Domain.Services.Configuration.Mapping
{
	public class IssuesMappingProfile : Profile
	{
		public IssuesMappingProfile()
		{
			CreateMap<Data.Issues.Issue, Domain.Issues.Issue>()
				.ForMember(
					domainIssue => domainIssue.Reporter,
					opt => opt.MapFrom(dataIssue => MapToUser(dataIssue.ReporterId))
				)
				.ForMember(
					domainIssue => domainIssue.Assigned,
					opt => opt.MapFrom(dataIssue => MapToUser(dataIssue.AssignedUserId))
				);

			CreateMap<Domain.Issues.Issue, Data.Issues.Issue>()
				.ForMember(
					dataIssue => dataIssue.ReporterId,
					opt => opt.MapFrom(issue => issue.Reporter.Id)
				)
				.ForMember(
					dataIssue => dataIssue.AssignedUserId,
					opt => opt.MapFrom(issue => issue.Assigned.Id)
				);
		}

		private User MapToUser(int userId)
		{
			return new User
			{
				Id = userId,
			};
		}
	}
}