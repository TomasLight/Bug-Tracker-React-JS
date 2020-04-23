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
				Date = DateTime.Now,
				Title = "Currency cannot be null",
				Description = "'Currency' field on Main form can be empty, and no validation errors here",
				Priority = (int) Priority.Low,
				Status = (int) Status.New,
			},
			new Issue
			{
				Id = 2,
				ReporterId = (int) FakeUserId.Manager,
				Type = (int) IssueType.Investigation,
				Date = DateTime.Today,
				Title = "Spike: Price converting",
				Description = "Investigate how we can convert prices to client currency",
				Priority = (int) Priority.Medium,
				Status = (int) Status.New,
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