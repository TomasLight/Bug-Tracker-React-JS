using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Api
{
    public interface IRepository<TEnt, in TPk> : IDisposable where TEnt : class
    {
        void Add(TEnt entity);
        void Update(TEnt entity);
        void Remove(TPk primaryKey);
        void Remove(TEnt entity);

        TEnt Get(TPk primaryKey);
        IEnumerable<TEnt> Get();
    }
}
