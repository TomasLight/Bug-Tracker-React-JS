using Bugs.Models.Context;
using Bugs.Models.Reposotories.Api;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Impl
{
    public class HistoryRepository : IHistoryRepository
    {
        private readonly BugContext _context;
        public HistoryRepository(BugContext context)
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

        public History Get(int foreignKey1, int foreignKey2, DateTime foreignKey3)
        {
            return _context.Histories.Find(foreignKey1, foreignKey2, foreignKey3);
        }

        /// <summary>
        /// Получение всех историй изменений ошибки вместе с пользователями их производившими
        /// </summary>
        /// <param name="bugId"></param>
        /// <returns></returns>
        public IEnumerable<History> GetBugHistories(int bugId)
        {
            return _context.Histories.Where(h => h.BugId == bugId).Include("Updater").ToList();
        }

        public IEnumerable<History> Get()
        {
            return _context.Histories.ToList();
        }

        public void Add(History entity)
        {
            if (entity == null)
                return;

            _context.Entry(entity).State = EntityState.Added;
            _context.SaveChanges();
        }

        public void Update(History entity)
        {
            if (entity == null)
                return;

            _context.Entry(entity).State = EntityState.Modified;
            _context.SaveChanges();
        }

        public void Remove(int foreignKey1, int foreignKey2, DateTime foreignKey3)
        {
            History removedHistory = Get(foreignKey1, foreignKey2, foreignKey3);
            Remove(removedHistory);
        }

        public void Remove(History entity)
        {
            if(entity == null)
                return;

            _context.Entry(entity).State = EntityState.Deleted;
            _context.SaveChanges();
        }
    }
}
