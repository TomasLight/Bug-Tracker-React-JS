using Microsoft.AspNetCore.Mvc;

namespace API.Security
{
	public class SimpleAuthorizeAttribute : TypeFilterAttribute
	{
		public SimpleAuthorizeAttribute() : base(typeof(SimpleAuthorizeFilter))
		{
		}
	}
}