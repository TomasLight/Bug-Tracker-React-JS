using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Bugs.Models.Context;
using Bugs.Models.Reposotories.Api;
using Microsoft.EntityFrameworkCore;

namespace Bugs.Models.Reposotories.Impl
{
    public class BugsRepository : IBugsRepository
    {
        private BugContext _context;
        public BugsRepository(BugContext context)
        {
            _context = context;
        }

        #region IDisposable members

        private bool disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    _context.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        #endregion

        public Bug Get(int primaryKey)
        {
            return _context.Bugs.Find(primaryKey);
        }

        public IEnumerable<Bug> Get()
        {
            return _context.Bugs.ToList();
        }

        public void Add(Bug entity)
        {
            if (entity == null)
                return;

            _context.Entry(entity).State = EntityState.Added;
            _context.SaveChanges();
        }

        public void Update(Bug entity)
        {
            if (entity == null)
                return;

            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Remove(int primaryKey)
        {
            Bug removedBug = Get(primaryKey);
            Remove(removedBug);
        }

        public void Remove(Bug entity)
        {
            if (entity == null)
                return;

            _context.Entry(entity).State = EntityState.Deleted;
            _context.SaveChanges();
        }
    }
}
