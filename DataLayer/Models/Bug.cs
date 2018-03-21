using DataLayer.Enums;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DataLayer.Models
{
    public class Bug
    {
        public int Id { get; set; }

        public string Name { get; set; }
        public string Description { get; set; }
        public Urgency Priority { get; set; }
        public Criticality Severity { get; set; }
        public Status Status { get; set; }

        public User Creator { get; set; }
        public DateTime DateCreate { get; set; }

        public ICollection<History> Histories { get; set; }

        public Bug() { }

        public Bug(string name, User creator, string description = "Некоторое описание ошибки", 
            Urgency priority = Urgency.Fourth, Criticality severity = Criticality.Low, Status status = Status.New)
        {
            Name = name;
            Description = description;
            Priority = priority;
            Severity = severity;
            Status = status;

            Creator = creator;
            DateCreate = DateTime.Now;
        }
    }
}
