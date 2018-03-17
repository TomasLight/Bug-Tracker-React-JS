using Bugs.Models.Context;
using Bugs.Models.Reposotories.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Impl
{
    public class HistoryRepoStepsRepository : RepositoryBase<HistoryRepoSteps, int>, IHistoryRepoStepsRepository
    {
        public HistoryRepoStepsRepository(BugContext context) : base(context) { }

        public override HistoryRepoSteps Get(int primaryKey)
        {
            return _context.HistoriesRepoSteps.Find(primaryKey);
        }

        public override IEnumerable<HistoryRepoSteps> Get()
        {
            return _context.HistoriesRepoSteps.ToList();
        }
    }
}
