using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Domain.Exceptions;
using Domain.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace API.Security
{
	public class AuthService
	{
		private readonly IHttpContextAccessor _httpContextAccessor;
		private readonly SignInManager<User> _signInManager;
		// private readonly JwtTokenManager _jwtTokenManager;
		private readonly IUserService _userService;
		
		public AuthService(
			IHttpContextAccessor httpContextAccessor, 
			SignInManager<User> signInManager, 
			// JwtTokenManager jwtTokenManager, 
			IUserService userService)
		{
			_httpContextAccessor = httpContextAccessor;
			// _jwtTokenManager = jwtTokenManager;
			_signInManager = signInManager;
			_userService = userService;
		}

		// public async Task<string> SignInAsync(string login, string password)
		public async Task SignInAsync(string login, string password)
		{
			var user = await _userService.GetByLoginAndPasswordAsync(login, password);
			if (user == null)
			{
				throw new NotFoundException();
			}
			
			var claimsIdentity = GetClaimsIdentity();
			if (claimsIdentity.Claims.All(claim => claim.Type != ClaimTypes.NameIdentifier))
			{
				var claim = new Claim(ClaimTypes.NameIdentifier, user.Login);
				claimsIdentity.AddClaim(claim);
			}

			await _signInManager.SignInAsync(user, false);

			// var token = _jwtTokenManager.EncodeJwt(claimsIdentity.Claims);
			// return token;
		}

		public async Task SignOffAsync()
		{
			var claimsIdentity = GetClaimsIdentity();
			var claim = claimsIdentity.FindFirst(ClaimTypes.NameIdentifier);
			claimsIdentity.RemoveClaim(claim);
			
			await _signInManager.SignOutAsync();
		}

		private ClaimsIdentity GetClaimsIdentity()
		{
			return GetUserClaimsPrincipal().Identities.First();
		}
		
		private ClaimsPrincipal GetUserClaimsPrincipal()
		{
			var currentUserClaims = _httpContextAccessor.HttpContext?.User;
			if (currentUserClaims == null)
			{
				throw new NullReferenceException(nameof(currentUserClaims));
			}

			// var jwtClaims = GetClaimsFromJwtToken();
			// if (!jwtClaims.Any())
			// {
			// 	return currentUserClaims;
			// }
			//
			// var claimTypes = currentUserClaims.Claims.Select(claim => claim.Type);
			// var missedClaims = jwtClaims.Where(jwtClaim => !claimTypes.Contains(jwtClaim.Type));
			// currentUserClaims.Identities.First().AddClaims(missedClaims);

			return currentUserClaims;
		}

		// private IEnumerable<Claim> GetClaimsFromJwtToken()
		// {
		// 	var request = _httpContextAccessor.HttpContext?.Request;
		// 	if (request == null)
		// 	{
		// 		throw new NullReferenceException("Request is not found in http context");
		// 	}
		//
		// 	var encodedJwtToken = request.Headers["Authorization"];
		// 	if (!encodedJwtToken.Any())
		// 	{
		// 		return new List<Claim>();
		// 	}
		//
		// 	var claims = _jwtTokenManager.GetClaimsFromEncodedJwtToken(encodedJwtToken);
		// 	return claims;
		// }
	}
}