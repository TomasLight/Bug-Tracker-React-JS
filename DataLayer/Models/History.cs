using DataLayer.Enums;
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Models
{
    public class History
    {
        // composite key

        [ForeignKey("VariesBug")]
        public int BugId { get; set; }

        [ForeignKey("Updater")]
        public int UserId { get; set; }

        public DateTime DateUpdate { get; set; }

        /// <summary>
        /// Пользователь, который внёс изменения
        /// </summary>
        public User Updater { get; set; }

        /// <summary>
        /// Баг, который подвергся изменениям
        /// </summary>
        public Bug VariesBug { get; set; }

        // other fields

        public Status NewStatus { get; set; }
        public string Comment { get; set; }

        public History() { }

        public History(User user, Bug bug, DateTime dateUpdate, Status newStatus, string comment)
        {
            Updater = user;
            VariesBug = bug;
            DateUpdate = dateUpdate;
            NewStatus = newStatus;
            Comment = comment;
        }
    }
}
