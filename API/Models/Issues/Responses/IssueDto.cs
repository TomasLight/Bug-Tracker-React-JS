using System;
using Domain.Enums;

namespace API.Models.Issues.Responses
{
	public class IssueDto
	{
		public int Id { get; set; }
		
		public IssueType Type { get; set; }

		public int ReporterId { get; set; }

		public string Title { get; set; }
		
		public string Description { get; set; }
		
		public Urgency Urgency { get; set; }
		
		public Severity Severity { get; set; }
		
		public Status Status { get; set; }
		
		public DateTime Date { get; set; }
	}
}