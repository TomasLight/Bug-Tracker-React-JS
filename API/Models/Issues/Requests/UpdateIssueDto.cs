using System.ComponentModel.DataAnnotations;
using API.Validation;
using Domain.Enums;

namespace API.Models.Issues.Requests
{
	public class UpdateIssueDto : NewIssueDto
	{
		[Required]
		public int Id { get; set; }
		
		[Required]
		[CorrectEnumValue]
		public Status Status { get; set; }
	}
}