using System.ComponentModel.DataAnnotations;

namespace API.Models.Auth.Requests
{
	public class SignInDto
	{
		[Required]
		public string Login { get; set; }

		[Required]
		public string Password { get; set; }
	}
}