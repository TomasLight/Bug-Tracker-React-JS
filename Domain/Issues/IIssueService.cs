using System.Collections.Generic;
using System.Threading.Tasks;
using Domain.Histories;
using Domain.Users;

namespace Domain.Issues
{
	public interface IIssueService : IDomainService
	{
		Task<IList<Issue>> GetAsync(bool withRemoved = false);

		Task<Issue> GetByIdAsync(int issueId);

		Task<Issue> AddAsync(Issue issue);

		Task<Issue> UpdateAsync(Issue issue, User updater);

		Task DeleteAsync(Issue issue, User updater);
	}
}