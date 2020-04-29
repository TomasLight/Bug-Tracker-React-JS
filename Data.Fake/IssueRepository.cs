using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Issues;
using Domain.Enums;

namespace Data.Fake
{
	public class IssueRepository : IIssueRepository
	{
		private static readonly string LoremIpsum =
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris ac ultrices odio, eget volutpat lacus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rhoncus tincidunt nisi. Proin sit amet luctus massa. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vivamus tempus rhoncus urna, vel aliquam velit mattis ac. Sed ut turpis ex. Curabitur magna risus, feugiat sit amet mi vel, suscipit faucibus lectus. Sed pellentesque aliquam facilisis. Aliquam lacus sem, porttitor in placerat in, blandit et sapien."; 
		
		private static List<Issue> _issues = new List<Issue>
		{
			new Issue
			{
				Id = 123,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.JeanneMoreau,
				Type = (int) IssueType.Bug,
				Priority = (int) Priority.OnHold,
				Status = (int) Status.New,
				Title = "Avatar size is broken",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 101,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.ElisabethSonrel,
				Type = (int) IssueType.Task,
				Priority = (int) Priority.Medium,
				Status = (int) Status.InProgress,
				Title = "Refactoring of data schedule in WebServices",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 124,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.ChristopherEccleston,
				Type = (int) IssueType.Bug,
				Priority = (int) Priority.Critical,
				Status = (int) Status.InPerReview,
				Title = "Ticket cannot be bought",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 109,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.MichaelCrawford,
				Type = (int) IssueType.Bug,
				Priority = (int) Priority.High,
				Status = (int) Status.ReadyForQA,
				Title = "Login page validation is not working",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 138,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.MorizHeider,
				Type = (int) IssueType.Task,
				Priority = (int) Priority.Medium,
				Status = (int) Status.QA,
				Title = "Update hotel list",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 104,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.TomasLight,
				Type = (int) IssueType.Investigation,
				Priority = (int) Priority.Medium,
				Status = (int) Status.Done,
				Title = "Markup calculation",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 88,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.ChristopherEccleston,
				Type = (int) IssueType.Task,
				Priority = (int) Priority.Medium,
				Status = (int) Status.New,
				Title = "Audit journal",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 116,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.ChristopherEccleston,
				Type = (int) IssueType.Investigation,
				Priority = (int) Priority.High,
				Status = (int) Status.InProgress,
				Title = "Find COVID-19 vaccine",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 89,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.TomasLight,
				Type = (int) IssueType.Task,
				Priority = (int) Priority.Medium,
				Status = (int) Status.InPerReview,
				Title = "Add duration field",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 108,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.JeanneMoreau,
				Type = (int) IssueType.Bug,
				Priority = (int) Priority.Critical,
				Status = (int) Status.ReadyForQA,
				Title = "Crash page when try to display notification",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 127,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.MorizHeider,
				Type = (int) IssueType.Task,
				Priority = (int) Priority.Low,
				Status = (int) Status.QA,
				Title = "New location filter",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 106,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.ElisabethSonrel,
				Type = (int) IssueType.Bug,
				Priority = (int) Priority.Low,
				Status = (int) Status.New,
				Title = "Missing translation",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 135,
				ReporterId = (int) FakeUserId.TomasLight,
				AssignedUserId = (int) FakeUserId.MichaelCrawford,
				Type = (int) IssueType.Task,
				Priority = (int) Priority.High,
				Status = (int) Status.ReadyForQA,
				Title = "Hire React-developer",
				Description = LoremIpsum,
				Date = DateTime.Now,
			},
		};

		public Task<IEnumerable<Issue>> GetAsync()
		{
			return Task.FromResult(_issues.AsEnumerable());
		}

		public Task<Issue> GetByIdAsync(int issueId)
		{
			var issue = _issues.FirstOrDefault(existingIssue => existingIssue.Id == issueId);
			return Task.FromResult(issue);
		}

		public Task<Issue> CreateAsync(Issue issue)
		{
			issue.Id = _issues.Max(existingIssue => existingIssue.Id) + 1;
			_issues.Add(issue);
			return Task.FromResult(issue);
		}

		public Task<Issue> UpdateAsync(Issue issue)
		{
			var targetIssue = _issues.FirstOrDefault(existingIssue => existingIssue.Id == issue.Id);
			if (targetIssue == null)
			{
				throw new NullReferenceException("Issue not found");
			}

			targetIssue.Date = issue.Date;
			targetIssue.Description = issue.Description;
			targetIssue.Priority = issue.Priority;
			targetIssue.Difficulty = issue.Difficulty;
			targetIssue.Status = issue.Status;
			targetIssue.Title = issue.Title;
			targetIssue.Type = issue.Type;
			targetIssue.ReporterId = issue.ReporterId;
			
			return Task.FromResult(targetIssue);
		}
	}
}