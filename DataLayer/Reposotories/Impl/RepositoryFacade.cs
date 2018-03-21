using DataLayer.Context;
using DataLayer.Reposotories.Api;
using System;

namespace DataLayer.Reposotories.Impl
{
    public class RepositoryFacade : IRepositoryFacade
    {
        private readonly IBugRepository _bugRepository;
        private readonly IHistoryRepository _historygRepository;
        private readonly IUserRepository _userRepository;

        public RepositoryFacade(BugContext context)
        {
            _bugRepository = new BugRepository(context);
            _historygRepository = new HistoryRepository(context);
            _userRepository = new UserRepository(context);
        }

        public IBugRepository Bugs()
        {
            return _bugRepository;
        }

        public IHistoryRepository Histories()
        {
            return _historygRepository;
        }

        public IUserRepository Users()
        {
            return _userRepository;
        }

        #region IDisposable members

        private bool _disposed = false;

        public virtual void Dispose(bool disposing)
        {
            if (!_disposed)
            {
                if (disposing)
                {
                    _bugRepository.Dispose();
                    _historygRepository.Dispose();
                    _userRepository.Dispose();
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
    }
}
