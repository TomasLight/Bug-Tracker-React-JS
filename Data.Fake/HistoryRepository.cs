using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Data.Histories;

namespace Data.Fake
{
	public class HistoryRepository : IHistoryRepository
	{
		private static readonly List<History> Histories = new List<History>();

		public Task<IEnumerable<History>> GetAsync()
		{
			return Task.FromResult(Histories.AsEnumerable());
		}

		public Task<IEnumerable<History>> GetByIssueIdAsync(int issueId)
		{
			var histories = Histories.Where(existingHistory => existingHistory.IssueId == issueId);
			return Task.FromResult(histories);
		}

		public Task<History> GetByIdAsync(int historyId)
		{
			var history = Histories.FirstOrDefault(existingHistory => existingHistory.Id == historyId);
			return Task.FromResult(history);
		}

		public Task<History> CreateAsync(History history)
		{
			if (Histories.Any())
			{
				history.Id = Histories.Max(existingHistory => existingHistory.Id) + 1;
			}
			else
			{
				history.Id = 1;
			}
			Histories.Add(history);

			foreach (var historyChange in history.Changes)
			{
				historyChange.HistoryId = history.Id;
			}

			return Task.FromResult(history);
		}
	}
}