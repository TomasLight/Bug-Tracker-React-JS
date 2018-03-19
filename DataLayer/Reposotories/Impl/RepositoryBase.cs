using DataLayer.Context;
using DataLayer.Reposotories.Api;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;

namespace DataLayer.Reposotories.Impl
{
    public class RepositoryBase<TEnt, TPk> : IRepository<TEnt, TPk> where TEnt : class
    {
        protected BugContext _context;
        public RepositoryBase(BugContext context)
        {
            _context = context;
        }

        #region IDisposable members

        private bool _disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed)
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

        public virtual TEnt Get(TPk primaryKey)
        {
            throw new NotImplementedException();
        }

        public virtual IEnumerable<TEnt> Get()
        {
            throw new NotImplementedException();
        }

        public virtual void Add(TEnt entity)
        {
            if (entity == null)
                return;

            _context.Entry(entity).State = EntityState.Added;
            _context.SaveChanges();
        }

        public virtual void Update(TEnt entity)
        {
            if (entity == null)
                return;

            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public virtual void Remove(TPk primaryKey)
        {
            TEnt removedEntity = Get(primaryKey);
            Remove(removedEntity);
        }

        public virtual void Remove(TEnt entity)
        {
            if (entity == null)
                return;

            _context.Entry(entity).State = EntityState.Deleted;
            _context.SaveChanges();
        }
    }
}
