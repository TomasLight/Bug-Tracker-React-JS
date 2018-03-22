
using DataLayer.Models;

namespace DataLayer.Reposotories.Api
{
    public interface IUserRepository : IRepository<User, int>
    {
        User Find(string login, string password);
    }
}
