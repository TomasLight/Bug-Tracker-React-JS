using System.ComponentModel.DataAnnotations;
using API.Validation;
using Domain.Enums;

namespace API.Models.Issues.Requests
{
	public class NewIssueDto
	{
		[Required]
		[CorrectEnumValue]
		public IssueType Type { get; set; }

		[Required]
		public string Title { get; set; }
		
		public string Description { get; set; }
		
		[Required]
		[CorrectEnumValue]
		public Priority Priority { get; set; }
		
		[Required]
		[CorrectEnumValue]
		public Status Status { get; set; }

		[Required]
		public int AssignedUserId { get; set; }
	}
}