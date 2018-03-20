using DataLayer.Context;
using DataLayer.Models;
using DataLayer.Reposotories.Api;
using System.Collections.Generic;
using System.Linq;

namespace DataLayer.Reposotories.Impl
{
    public class HistoryNameRepository : RepositoryBase<HistoryName, int>, IHistoryNameRepository
    {
        public HistoryNameRepository(BugContext context) : base(context) { }

        public override HistoryName Get(int primaryKey)
        {
            return _context.HistoriesName.Find(primaryKey);
        }

        public override IEnumerable<HistoryName> Get()
        {
            return _context.HistoriesName.ToList();
        }
    }
}
