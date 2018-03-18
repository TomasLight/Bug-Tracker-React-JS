using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Enums
{
    /// <summary>
    /// Критичность ошибки
    /// </summary>
    public enum Criticality
    {
        [Display(Name = "Запрос на изменение")]
        /// <summary>
        /// Запрос на изменение
        /// </summary>
        Low = 1,

        [Display(Name = "Некритичная")]
        /// <summary>
        /// Некритичная
        /// </summary>
        Medium = 2,

        [Display(Name = "Критичная")]
        /// <summary>
        /// Критичная
        /// </summary>
        High = 3,

        [Display(Name = "Авария")]
        /// <summary>
        /// Авария
        /// </summary>
        Critical = 4
    }
}
