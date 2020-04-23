using System.Linq;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;

namespace API.Security
{
	public class SimpleAuthorizeFilter : IAuthorizationFilter
	{
		public void OnAuthorization(AuthorizationFilterContext context)
		{
			var userClaims = context.HttpContext.User.Claims;
			var hasClaim = userClaims.Any(
				claim => claim.Type == ClaimTypes.NameIdentifier &&
						 !string.IsNullOrEmpty(claim.Value)
			);
			if (!hasClaim)
			{
				context.Result = new ForbidResult();
			}
		}
	}
}