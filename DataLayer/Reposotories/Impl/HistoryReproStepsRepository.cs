using DataLayer.Context;
using DataLayer.Models;
using DataLayer.Reposotories.Api;
using System.Collections.Generic;
using System.Linq;

namespace DataLayer.Reposotories.Impl
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
