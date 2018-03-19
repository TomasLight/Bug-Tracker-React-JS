using DataLayer.Context;
using DataLayer.Models;
using DataLayer.Reposotories.Api;
using System.Collections.Generic;
using System.Linq;

namespace DataLayer.Reposotories.Impl
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
