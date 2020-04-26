namespace API.Models.Users.Responses
{
	public class UserDto
	{
		public int Id { get; set; }
		
		public string Login { get; set; }
		
		public string Password { get; set; }
		
		public string LastName { get; set; }
		
		public string FirstName { get; set; }
		
		public string Avatar { get; set; }
	}
}