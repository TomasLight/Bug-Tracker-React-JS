using Bugs.Models.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models
{
    public class History
    {
        public int Id { get; set; }
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

        public HistoryPriority PriorityChanges { get; set; }
        public HistoryReproSteps ReproStepsChanges { get; set; }
        public HistorySeverity SeverityChanges { get; set; }
        public HistoryStatus StatusChanges { get; set; }

        public History() { }
        public History(User user, Bug bug, DateTime dateUpdate)
        {
            Updater = user;
            VariesBug = bug;
            DateUpdate = dateUpdate;
        }

        /// <summary>
        /// Заполнение информации для только что зарегистрировнной ошибки
        /// </summary>
        /// <param name="comment">StatusChanges = Status.New</param>
        /// <param name="priority"></param>
        /// <param name="severity"></param>
        /// <param name="descriptionSteps"></param>
        public void Regitry(string comment, string descriptionSteps, Urgency priority = Urgency.Third, Criticality severity = Criticality.Medium)
        {
            this.SetNewStatus(Status.New, comment);
            this.SetNewRepoSteps(descriptionSteps);
            this.SetNewPriority(priority);
            this.SetNewSeverity(severity);
        }

        public void SetNewPriority(Urgency priority)
        {
            PriorityChanges = new HistoryPriority(this, priority);
        }

        public void SetNewRepoSteps(string descriptionSteps)
        {
            ReproStepsChanges = new HistoryReproSteps(this, descriptionSteps);
        }

        public void SetNewSeverity(Criticality severity)
        {
            SeverityChanges = new HistorySeverity(this, severity);
        }

        public void SetNewStatus(Status status, string comment)
        {
            StatusChanges = new HistoryStatus(this, status, comment);
        }
    }
}
