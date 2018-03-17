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
    }
}
