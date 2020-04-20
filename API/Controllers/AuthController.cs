using System.Threading.Tasks;
using API.Models.Auth.Requests;
using API.Security;
using Domain.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[ApiController]
	[Route("api/auth")]
	public class AuthController : ControllerBase
	{
		private readonly AuthService _authService;

		public AuthController(AuthService authService)
		{
			_authService = authService;
		}

		[HttpPost]
		[Route("sign-in")]
		public async Task<IActionResult> SignIn(SignInDto request)
		{
			// string token;
			try
			{
				// token = await _authService.SignInAsync(request.Login, request.Password);
				await _authService.SignInAsync(request.Login, request.Password);
			}
			catch (NotFoundException)
			{
				return NotFound();
			}

			// return Ok(token);
			return Ok();
		}

		[SimpleAuthorize]
		[HttpPost]
		[Route("sign-off")]
		public async Task<IActionResult> SignOff()
		{
			await _authService.SignOffAsync();
			return Ok();
		}
	}
}