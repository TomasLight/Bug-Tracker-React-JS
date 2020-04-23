using System.Linq;
using System.Threading.Tasks;
using API.Models.Users.Responses;
using AutoMapper;
using Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[ApiController]
	[Route("api")]
	public class UsersController : ControllerBase
	{
		private readonly IMapper _mapper;
		private readonly IUserService _userService;

		public UsersController(IMapper mapper, IUserService userService)
		{
			_mapper = mapper;
			_userService = userService;
		}

		[HttpGet]
		[Route("users")]
		public async Task<IActionResult> GetUsers()
		{
			var users = await _userService.GetAsync();
			var dtos = users.Select(_mapper.Map<UserDto>).ToList();

			return Ok(dtos);
		}
	}
}