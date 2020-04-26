using System.Linq;
using System.Threading.Tasks;
using API.Models.Users.Responses;
using AutoMapper;
using Data.Fake;
using Domain.Exceptions;
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

		[HttpGet]
		[Route("users/{userId:int}")]
		public async Task<IActionResult> GetUser(int userId)
		{
			User user;
			try
			{
				user = await _userService.GetByIdAsync(userId);
			}
			catch (NotFoundException)
			{
				return NotFound("User not found");
			}

			var dto = _mapper.Map<UserDto>(user);

			return Ok(dto);
		}

		[HttpGet]
		[Route("users/current")]
		public async Task<IActionResult> GetCurrentUser()
		{
			User user;
			try
			{
				// temp solution, util will implement authentication
				user = await _userService.GetByIdAsync((int) FakeUserId.TomasLight);
			}
			catch (NotFoundException)
			{
				return NotFound("User not found");
			}

			var dto = _mapper.Map<UserDto>(user);

			return Ok(dto);
		}
	}
}