using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Api
{
    public interface IHistoryRepository : IRepositoryComposite<History, int, int, DateTime>/*IRepository<History, new[] {int, int, DateTime}>*/
    {
        /// <summary>
        /// Получение всех историй изменений ошибки вместе с пользователями их производившими
        /// </summary>
        /// <param name="bugId"></param>
        /// <returns></returns>
        IEnumerable<History> GetBugHistories(int bugId);
    }
}
