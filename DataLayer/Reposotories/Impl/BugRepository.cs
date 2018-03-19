using System.Collections.Generic;
using System.Linq;
using DataLayer.Context;
using DataLayer.Models;
using DataLayer.Reposotories.Api;

namespace DataLayer.Reposotories.Impl
{
    public class BugRepository : RepositoryBase<Bug, int>, IBugRepository
    {
        public BugRepository(BugContext context) : base(context) { }

        public override Bug Get(int primaryKey)
        {
            return _context.Bugs.Find(primaryKey);
        }

        public override IEnumerable<Bug> Get()
        {
            return _context.Bugs.ToList();
        }
    }
}
