using System.Linq;
using System.Threading.Tasks;
using API.Models.Issues.Requests;
using API.Models.Issues.Responses;
using AutoMapper;
using Data.Fake;
using Domain.Enums;
using Domain.Exceptions;
using Domain.Issues;
using Domain.Users;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[ApiController]
	[Route("api")]
	public class IssuesController : ControllerBase
	{
		private readonly IMapper _mapper;
		private readonly IIssueService _issueService;
		private readonly IUserService _userService;

		public IssuesController(IMapper mapper, IIssueService issueService, IUserService userService)
		{
			_mapper = mapper;
			_issueService = issueService;
			_userService = userService;
		}

		[HttpGet]
		[Route("issues")]
		public async Task<IActionResult> GetIssues()
		{
			var issues = await _issueService.GetAsync();
			var dtos = issues.Select(_mapper.Map<IssueDto>).ToList();

			return Ok(dtos);
		}

		[HttpGet]
		[Route("issues/{issueId:int}")]
		public async Task<IActionResult> GetIssue(int issueId)
		{
			var issue = await _issueService.GetByIdAsync(issueId);
			var dto = _mapper.Map<IssueDto>(issue);

			return Ok(dto);
		}

		[HttpPost]
		[Route("issue")]
		public async Task<IActionResult> CreateIssue(NewIssueDto newIssueDto)
		{
			var user = await _userService.GetByIdAsync(newIssueDto.AssignedUserId);
			if (user == null)
			{
				return BadRequest("Assigned user not found");
			}

			var issue = _mapper.Map<Issue>(newIssueDto);
			issue.Status = Status.New;
			issue.Assigned = user;
			// TODO: getting of current user
			issue.Reporter = new User
			{
				Id = (int) FakeUserId.TomasLight,
			};
			
			await _issueService.AddAsync(issue);

			var dto = _mapper.Map<IssueDto>(issue);
			return Ok(dto);
		}

		[HttpPut]
		[Route("issue")]
		public async Task<IActionResult> UpdateIssue(UpdateIssueDto updateIssueDto)
		{
			var issue = await _issueService.GetByIdAsync(updateIssueDto.Id);
			if (issue == null)
			{
				return NotFound("Issue not found");
			}
			
			var user = await _userService.GetByIdAsync(updateIssueDto.AssignedUserId);
			if (user == null)
			{
				return BadRequest("Assigned user not found");
			}

			_mapper.Map(updateIssueDto, issue);
			issue.Assigned = user; 

			// TODO: getting of current user
			var updater = new User
			{
				Id = (int) FakeUserId.TomasLight,
			};

			await _issueService.UpdateAsync(issue, updater);

			var dto = _mapper.Map<IssueDto>(issue);
			return Ok(dto);
		}

		[HttpDelete]
		[Route("issues/{issueId:int}")]
		public async Task<IActionResult> DeleteIssue(int issueId)
		{
			var issue = await _issueService.GetByIdAsync(issueId);
			// TODO: getting of current user
			var updater = new User
			{
				Id = (int) FakeUserId.NA,
			};

			try
			{
				await _issueService.DeleteAsync(issue, updater);
			}
			catch (NotFoundException)
			{
				return NotFound("Issue not found");
			}

			return Ok();
		}
	}
}