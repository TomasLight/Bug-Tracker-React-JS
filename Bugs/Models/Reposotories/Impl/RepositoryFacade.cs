using Bugs.Models.Context;
using Bugs.Models.Reposotories.Api;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Impl
{
    public class RepositoryFacade : IRepositoryFacade
    {
        private readonly IBugRepository _bugRepository;
        private readonly IHistoryRepository _historygRepository;
        private readonly IUserRepository _userRepository;
        private readonly IHistoryPriorityRepository _prioritiesRepository;
        private readonly IHistoryReproStepsRepository _repoStepsRepository;
        private readonly IHistorySeverityRepository _severitiesRepository;
        private readonly IHistoryStatusRepository _statusesRepository;

        public RepositoryFacade(BugContext context)
        {
            _bugRepository = new BugRepository(context);
            _historygRepository = new HistoryRepository(context);
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
    }
}
