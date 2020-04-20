using System;
using System.Collections.Generic;
using Domain.Enums;
using Domain.Histories;
using Domain.Users;

namespace Domain.Issues
{
	public class Issue : IDomainModel
	{
		public int Id { get; set; }
		
		public IssueType Type { get; set; }

		public User Reporter { get; set; }

		public string Title { get; set; }
		
		public string Description { get; set; }
		
		public Urgency Urgency { get; set; }
		
		public Severity Severity { get; set; }
		
		public Status Status { get; set; }
		
		public DateTime Date { get; set; }

		public ICollection<History> Histories { get; set; }
	}
}