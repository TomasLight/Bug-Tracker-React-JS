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
		private static List<Issue> _issues = new List<Issue>
		{
			new Issue
			{
				Id = 1,
				ReporterId = (int) FakeUserId.QA,
				Type = (int) IssueType.Defect,
				Priority = (int) Priority.OnHold,
				Status = (int) Status.New,
				Title = "Avatar size is broken",
				Description = "'Currency' field on Main form can be empty, and no validation errors here",
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 2,
				ReporterId = (int) FakeUserId.QA,
				Type = (int) IssueType.Task,
				Priority = (int) Priority.Critical,
				Status = (int) Status.InProgress,
				Title = "Refactoring of data schedule in WebServices",
				Description = "'Currency' field on Main form can be empty, and no validation errors here",
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 3,
				ReporterId = (int) FakeUserId.QA,
				Type = (int) IssueType.Bug,
				Priority = (int) Priority.Critical,
				Status = (int) Status.InPerReview,
				Title = "Ticket cannot be bought",
				Description = "'Currency' field on Main form can be empty, and no validation errors here",
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 4,
				ReporterId = (int) FakeUserId.QA,
				Type = (int) IssueType.Bug,
				Priority = (int) Priority.High,
				Status = (int) Status.ReadyForQA,
				Title = "Login page validation is not working",
				Description = "'Currency' field on Main form can be empty, and no validation errors here",
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 5,
				ReporterId = (int) FakeUserId.QA,
				Type = (int) IssueType.Task,
				Priority = (int) Priority.Medium,
				Status = (int) Status.New,
				Title = "Affiliate audit journal",
				Description = "'Currency' field on Main form can be empty, and no validation errors here",
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 6,
				ReporterId = (int) FakeUserId.QA,
				Type = (int) IssueType.Investigation,
				Priority = (int) Priority.High,
				Status = (int) Status.InProgress,
				Title = "Markup calculation",
				Description = "'Currency' field on Main form can be empty, and no validation errors here",
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 7,
				ReporterId = (int) FakeUserId.QA,
				Type = (int) IssueType.Task,
				Priority = (int) Priority.Medium,
				Status = (int) Status.InPerReview,
				Title = "Add duration field",
				Description = "'Currency' field on Main form can be empty, and no validation errors here",
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 8,
				ReporterId = (int) FakeUserId.QA,
				Type = (int) IssueType.Bug,
				Priority = (int) Priority.Critical,
				Status = (int) Status.ReadyForQA,
				Title = "Crash page when try to display notification",
				Description = "'Currency' field on Main form can be empty, and no validation errors here",
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 9,
				ReporterId = (int) FakeUserId.QA,
				Type = (int) IssueType.Bug,
				Priority = (int) Priority.Low,
				Status = (int) Status.New,
				Title = "Missing translation",
				Description = "'Currency' field on Main form can be empty, and no validation errors here",
				Date = DateTime.Now,
			},
			new Issue
			{
				Id = 10,
				ReporterId = (int) FakeUserId.QA,
				Type = (int) IssueType.Task,
				Priority = (int) Priority.Critical,
				Status = (int) Status.ReadyForQA,
				Title = "Currency cannot be null",
				Description = "'Currency' field on Main form can be empty, and no validation errors here",
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