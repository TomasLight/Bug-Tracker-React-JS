using DataLayer.Context;
using DataLayer.Models;
using DataLayer.Reposotories.Api;
using System.Collections.Generic;
using System.Linq;

namespace DataLayer.Reposotories.Impl
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

        public User Find(string login, string password)
        {
            return _context.Users.FirstOrDefault(u => u.Login == login && u.Password == password);
        }
    }
}
