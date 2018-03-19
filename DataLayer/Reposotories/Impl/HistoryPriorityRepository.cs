using DataLayer.Context;
using DataLayer.Models;
using DataLayer.Reposotories.Api;
using System.Collections.Generic;
using System.Linq;

namespace DataLayer.Reposotories.Impl
{
    public class HistoryPriorityRepository : RepositoryBase<HistoryPriority, int>, IHistoryPriorityRepository
    {
        public HistoryPriorityRepository(BugContext context) : base(context) { }

        public override HistoryPriority Get(int primaryKey)
        {
            return _context.HistoriesPriority.Find(primaryKey);
        }

        public override IEnumerable<HistoryPriority> Get()
        {
            return _context.HistoriesPriority.ToList();
        }
    }
}
