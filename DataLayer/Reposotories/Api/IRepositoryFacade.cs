using System;

namespace DataLayer.Reposotories.Api
{
    public interface IRepositoryFacade : IDisposable
    {
        IBugRepository Bugs();
        IHistoryRepository Histories();
        IUserRepository Users();
    }
}
