using Bugs.Models.Context;
using Bugs.Models.Reposotories.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Impl
{
    public class HistoryReproStepsRepository : RepositoryBase<HistoryReproSteps, int>, IHistoryReproStepsRepository
    {
        public HistoryReproStepsRepository(BugContext context) : base(context) { }

        public override HistoryReproSteps Get(int primaryKey)
        {
            return _context.HistoriesReproSteps.Find(primaryKey);
        }

        public override IEnumerable<HistoryReproSteps> Get()
        {
            return _context.HistoriesReproSteps.ToList();
        }
    }
}
