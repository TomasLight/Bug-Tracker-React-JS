using System;

namespace DataLayer.Reposotories.Api
{
    public interface IRepositoryFacade : IDisposable
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
