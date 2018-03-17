using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Api
{
    public interface IUserRepository : IRepository<User, int>
    {
    }
}
