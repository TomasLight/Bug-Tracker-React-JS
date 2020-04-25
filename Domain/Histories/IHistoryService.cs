using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Histories
{
	public interface IHistoryService : IDomainService
	{
		Task<IList<History>> GetByIssueIdAsync(int issueId);
		
		Task<IList<History>> GetByUserIdAsync(int updaterId);
	}
}