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
        private readonly IBugsRepository _bugRepository;
        private readonly IHistoriesRepository _historygRepository;
        private readonly IUsersRepository _userRepository;

        public RepositoryFacade(BugContext context)
        {
            _bugRepository = new BugsRepository(context);
            _historygRepository = new HistoriesRepository(context);
            _userRepository = new UsersRepository(context);
        }

        public IBugsRepository Bugs()
        {
            return _bugRepository;
        }

        public IHistoriesRepository Histories()
        {
            return _historygRepository;
        }

        public IUsersRepository Users()
        {
            return _userRepository;
        }
    }
}
