using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Api
{
    public interface IRepositoryFacade
    {
        IBugRepository Bugs();
        IHistoryRepository Histories();
        IHistoryPriorityRepository Priorities();
        IHistoryReproStepsRepository RepoSteps();
        IHistorySeverityRepository Severities();
        IHistoryStatusRepository Statuses();
        IUserRepository Users();
    }
}
