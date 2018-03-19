using DataLayer.Context;
using DataLayer.Models;
using DataLayer.Reposotories.Api;
using System.Collections.Generic;
using System.Linq;

namespace DataLayer.Reposotories.Impl
{
    public class HistorySeverityRepository : RepositoryBase<HistorySeverity, int>, IHistorySeverityRepository
    {
        public HistorySeverityRepository(BugContext context) : base(context) { }

        public override HistorySeverity Get(int primaryKey)
        {
            return _context.HistoriesSeverity.Find(primaryKey);
        }

        public override IEnumerable<HistorySeverity> Get()
        {
            return _context.HistoriesSeverity.ToList();
        }
    }
}
