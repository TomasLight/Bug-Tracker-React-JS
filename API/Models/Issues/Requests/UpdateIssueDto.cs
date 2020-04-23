using System.ComponentModel.DataAnnotations;

namespace API.Models.Issues.Requests
{
	public class UpdateIssueDto : NewIssueDto
	{
		[Required]
		public int Id { get; set; }
	}
}