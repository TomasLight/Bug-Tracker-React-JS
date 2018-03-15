using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Enums
{
    /// <summary>
    /// Критичность ошибки
    /// </summary>
    public enum Criticality
    {
        /// <summary>
        /// Запрос на изменение
        /// </summary>
        Low = 1,

        /// <summary>
        /// Некритичная
        /// </summary>
        Medium = 2,

        /// <summary>
        /// Критичная
        /// </summary>
        High = 3,

        /// <summary>
        /// Авария
        /// </summary>
        Critical = 4
    }
}
