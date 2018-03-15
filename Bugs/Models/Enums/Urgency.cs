using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Enums
{
    /// <summary>
    /// Срочность исправления ошибки
    /// </summary>
    public enum Urgency
    {
        /// <summary>
        /// Очень Срочно
        /// </summary>
        First = 1,

        /// <summary>
        /// Срочно
        /// </summary>
        Second = 2,

        /// <summary>
        /// Несрочно
        /// </summary>
        Third = 3,

        /// <summary>
        /// Совсем несрочно
        /// </summary>
        Fourth = 4
    }
}
