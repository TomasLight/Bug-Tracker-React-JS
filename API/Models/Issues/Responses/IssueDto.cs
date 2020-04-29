using System;
using Domain.Enums;

namespace API.Models.Issues.Responses
{
	public class IssueDto
	{
		public int Id { get; set; }

		public IssueType Type { get; set; }

		public int ReporterId { get; set; }

		public int AssignedUserId { get; set; }

		public string Title { get; set; }

		public string Description { get; set; }

		public Priority Priority { get; set; }

		public Status Status { get; set; }

		public DateTime Date { get; set; }
	}
}