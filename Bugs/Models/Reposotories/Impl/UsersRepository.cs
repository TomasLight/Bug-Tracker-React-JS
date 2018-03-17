using Bugs.Models.Context;
using Bugs.Models.Reposotories.Api;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Impl
{
    public class UsersRepository : IUsersRepository
    {
        private readonly BugContext _context;
        public UsersRepository(BugContext context)
        {
            _context = context;
        }

        #region IDisposable members

        private bool _disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this._disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                _disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion

        public User Get(int primaryKey)
        {
            return _context.Users.Find(primaryKey);
        }

        public IEnumerable<User> Get()
        {
            return _context.Users.ToList();
        }

        public void Add(User entity)
        {
            if (entity == null)
                return;

            _context.Entry(entity).State = EntityState.Added;
            _context.SaveChanges();
        }

        public void Update(User entity)
        {
            if (entity == null)
                return;

            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Remove(int primaryKey)
        {
            User removedUser = Get(primaryKey);
            Remove(removedUser);
        }

        public void Remove(User entity)
        {
            if(entity == null)
                return;

            _context.Entry(entity).State = EntityState.Deleted;
            _context.SaveChanges();
        }
    }
}
