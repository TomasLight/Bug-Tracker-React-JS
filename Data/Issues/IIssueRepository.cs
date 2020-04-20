using System.Collections.Generic;
using System.Threading.Tasks;

namespace Data.Issues
{
	public interface IIssueRepository : IEntityModel
	{
		Task<IEnumerable<Issue>> GetAsync();
		
		Task<Issue> GetByIdAsync(int issueId);
		
		Task<Issue> CreateAsync(Issue issue);
		
		Task<Issue> UpdateAsync(Issue issue);
	}
}