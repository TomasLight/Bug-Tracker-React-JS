using Bugs.Models.Context;
using Bugs.Models.Reposotories.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Impl
{
    public class HistoryStatusRepository : RepositoryBase<HistoryStatus, int>, IHistoryStatusRepository
    {
        public HistoryStatusRepository(BugContext context) : base(context) { }

        public override HistoryStatus Get(int primaryKey)
        {
            return _context.HistoriesStatus.Find(primaryKey);
        }

        public override IEnumerable<HistoryStatus> Get()
        {
            return _context.HistoriesStatus.ToList();
        }        
    }
}
