using Bugs.Models.Context;
using Bugs.Models.Reposotories.Api;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Impl
{
    public class UserRepository : RepositoryBase<User, int>, IUserRepository
    {
        public UserRepository(BugContext context) : base(context) { }

        public override User Get(int primaryKey)
        {
            return _context.Users.Find(primaryKey);
        }

        public override IEnumerable<User> Get()
        {
            return _context.Users.ToList();
        }
    }
}
