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
        private readonly IHistoryNameRepository _namesRepository;
        private readonly IHistoryPriorityRepository _prioritiesRepository;
        private readonly IHistoryReproStepsRepository _repoStepsRepository;
        private readonly IHistorySeverityRepository _severitiesRepository;
        private readonly IHistoryStatusRepository _statusesRepository;

        public RepositoryFacade(BugContext context)
        {
            _bugRepository = new BugRepository(context);
            _historygRepository = new HistoryRepository(context);
            _namesRepository = new HistoryNameRepository(context);
            _prioritiesRepository = new HistoryPriorityRepository(context);
            _repoStepsRepository = new HistoryReproStepsRepository(context);
            _severitiesRepository = new HistorySeverityRepository(context);
            _statusesRepository = new HistoryStatusRepository(context);
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

        public IHistoryPriorityRepository Priorities()
        {
            return _prioritiesRepository;
        }

        public IHistoryNameRepository Names()
        {
            return _namesRepository;
        }

        public IHistoryReproStepsRepository RepoSteps()
        {
            return _repoStepsRepository;
        }

        public IHistorySeverityRepository Severities()
        {
            return _severitiesRepository;
        }

        public IHistoryStatusRepository Statuses()
        {
            return _statusesRepository;
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
                    _prioritiesRepository.Dispose();
                    _repoStepsRepository.Dispose();
                    _severitiesRepository.Dispose();
                    _statusesRepository.Dispose();
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
