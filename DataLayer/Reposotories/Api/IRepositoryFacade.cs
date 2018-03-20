using System;

namespace DataLayer.Reposotories.Api
{
    public interface IRepositoryFacade : IDisposable
    {
        IBugRepository Bugs();
        IHistoryRepository Histories();
        IHistoryNameRepository Names();
        IHistoryPriorityRepository Priorities();
        IHistoryReproStepsRepository RepoSteps();
        IHistorySeverityRepository Severities();
        IHistoryStatusRepository Statuses();
        IUserRepository Users();
    }
}
