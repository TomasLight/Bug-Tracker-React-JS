using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Reposotories.Api
{
    public interface IRepositoryComposite <TEnt, in TFk1, in TFk2, in TFk3> : IDisposable where TEnt : class
    {
        void Add(TEnt entity);
        void Update(TEnt entity);
        void Remove(TFk1 foreignKey1, TFk2 foreignKey2, TFk3 foreignKey3);
        void Remove(TEnt entity);

        TEnt Get(TFk1 foreignKey1, TFk2 foreignKey2, TFk3 foreignKey3);
        IEnumerable<TEnt> Get();
    }
}
