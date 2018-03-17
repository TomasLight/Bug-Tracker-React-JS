using Bugs.Models.Context;
using Bugs.Models.Reposotories.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Impl
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
