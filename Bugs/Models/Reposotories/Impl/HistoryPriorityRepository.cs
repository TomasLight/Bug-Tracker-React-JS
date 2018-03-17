using Bugs.Models.Context;
using Bugs.Models.Reposotories.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Impl
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
