using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Issues;
using Domain.Users;
using Data.Histories;
using Data.Issues;
using Domain.Enums;
using Domain.Exceptions;
using History = Domain.Histories.History;
using HistoryChange = Domain.Histories.HistoryChange;
using Issue = Domain.Issues.Issue;

namespace Domain.Services
{
	public class IssueService : IIssueService
	{
		private readonly IMapper _mapper;
		private readonly IIssueRepository _issueRepository;
		private readonly IHistoryRepository _historyRepository;

		public IssueService(
			IMapper mapper,
			IIssueRepository issueRepository,
			IHistoryRepository historyRepository
			)
		{
			_mapper = mapper;
			_issueRepository = issueRepository;
			_historyRepository = historyRepository;
		}

		public async Task<IList<Issue>> GetAsync(bool withRemoved = false)
		{
			var issuesEntities = await _issueRepository.GetAsync();
			var issues = issuesEntities.Select(_mapper.Map<Issue>);
			if (!withRemoved)
			{
				issues = issues.Where(issue => issue.Status != Status.Removed);
			}
			return issues.ToList();
		}

		public async Task<Issue> GetByIdAsync(int issueId)
		{
			var issueEntity = await _issueRepository.GetByIdAsync(issueId);
			if (issueEntity == null)
			{
				return null;
			}

			var issue = _mapper.Map<Issue>(issueEntity);

			var historyEntities = await _historyRepository.GetByIssueIdAsync(issueId);
			issue.Histories = historyEntities.Select(_mapper.Map<History>).ToList();
			
			return issue;
		}

		public async Task<Issue> AddAsync(Issue issue)
		{
			var issueEntity = _mapper.Map<Data.Issues.Issue>(issue);
			issueEntity.Date = DateTime.Now;

			await _issueRepository.CreateAsync(issueEntity);
			return _mapper.Map(issueEntity, issue);
		}

		public async Task<Issue> UpdateAsync(Issue issue, User updater)
		{
			var pristineIssue = await GetByIdAsync(issue.Id);
			if (pristineIssue == null)
			{
				throw new NotFoundException();
			}

			var changes = GetIssueChanges(pristineIssue, issue);
			var historyEntity = new Data.Histories.History
			{
				IssueId = pristineIssue.Id,
				UpdaterId = updater.Id,
				Date = DateTime.Now,
				Changes = changes.Select(_mapper.Map<Data.Histories.HistoryChange>).ToList(),
			};
			
			await _historyRepository.CreateAsync(historyEntity);
			var history = _mapper.Map<History>(historyEntity);
			
			if (pristineIssue.Histories == null)
			{
				issue.Histories = new List<History>();
			}
			else
			{
				issue.Histories = pristineIssue.Histories;
			}
			issue.Histories.Add(history);

			var updatedIssueEntity = _mapper.Map<Data.Issues.Issue>(issue);
			await _issueRepository.UpdateAsync(updatedIssueEntity);

			return _mapper.Map(updatedIssueEntity, issue);
		}

		public async Task DeleteAsync(Issue issue, User updater)
		{
			issue.Status = Status.Removed;
			await UpdateAsync(issue, updater);
		}

		private IList<HistoryChange> GetIssueChanges(Issue pristineIssue, Issue updatedIssue)
		{
			var builder = new HistoryChangesBuilder(pristineIssue, updatedIssue);
			
			builder.AppendDiff(nameof(pristineIssue.Title));
			builder.AppendDiff(nameof(pristineIssue.Description));
			builder.AppendDiff(nameof(pristineIssue.Priority));
			builder.AppendDiff(nameof(pristineIssue.Difficulty));
			builder.AppendDiff(nameof(pristineIssue.Status));
			builder.AppendDiff(nameof(pristineIssue.Type));

			var changes = builder.Build();
			return changes;
		}
	}
}