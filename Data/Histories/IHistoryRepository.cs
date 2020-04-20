using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.Histories
{
	public interface IHistoryRepository
	{
		Task<IEnumerable<History>> GetAsync();

		Task<IEnumerable<History>> GetByIssueIdAsync(int issueId);

		Task<History> GetByIdAsync(int historyId);

		Task<History> CreateAsync(History history);
	}
}