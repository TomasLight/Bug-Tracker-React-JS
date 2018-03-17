using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bugs.Models.Context;
using Bugs.Models.Reposotories.Api;
using Microsoft.EntityFrameworkCore;

namespace Bugs.Models.Reposotories.Impl
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
