using System.ComponentModel.DataAnnotations;
using Domain.Enums;

namespace API.Models.Issues.Requests
{
	public class NewIssueDto
	{
		[Required]
		public IssueType Type { get; set; }

		[Required]
		public string Title { get; set; }
		
		public string Description { get; set; }
		
		[Required]
		public Priority Priority { get; set; }
		
		[Required]
		public Status Status { get; set; }

		[Required]
		public int AssignedUserId { get; set; }
	}
}