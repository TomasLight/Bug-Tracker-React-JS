using System.Linq;
using System.Threading.Tasks;
using API.Models.Issues.Requests;
using API.Models.Issues.Responses;
using AutoMapper;
using Data.Fake;
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

		public IssuesController(IMapper mapper, IIssueService issueService)
		{
			_mapper = mapper;
			_issueService = issueService;
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
			var issue = _mapper.Map<Issue>(newIssueDto);
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

			_mapper.Map(updateIssueDto, issue);
			// TODO: getting of current user
			var updater = new User
			{
				Id = (int) FakeUserId.Admin,
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
				Id = (int) FakeUserId.Admin,
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