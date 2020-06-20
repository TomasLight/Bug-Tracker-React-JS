using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Domain.Histories;
using Data.Histories;
using History = Domain.Histories.History;

namespace Domain.Services
{
	public class HistoryService : IHistoryService
	{
		private readonly IMapper _mapper;
		private readonly IHistoryRepository _historyRepository;

		public HistoryService(IMapper mapper, IHistoryRepository historyRepository)
		{
			_mapper = mapper;
			_historyRepository = historyRepository;
		}

		public async Task<IList<History>> GetByIssueIdAsync(int issueId)
		{
			var historyEntities = await _historyRepository.GetAsync();
			var issueHistories = historyEntities
				.Where(history => history.IssueId == issueId)
				.Select(_mapper.Map<History>)
				.ToList();

			return issueHistories;
		}

		public async Task<IList<History>> GetByUserIdAsync(int updaterId)
		{
			var historyEntities = await _historyRepository.GetAsync();
			var issueHistories = historyEntities
				 .Where(history => history.UpdaterId == updaterId)
				 .Select(_mapper.Map<History>)
				 .ToList();

			return issueHistories;
		}
	}
}