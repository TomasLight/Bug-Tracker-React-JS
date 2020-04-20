using AutoMapper;

namespace Domain.Services.Configuration.Mapping
{
	public class HistoryMappingProfile : Profile
	{
		public HistoryMappingProfile()
		{
			CreateMap<Domain.Histories.HistoryChange, Data.Histories.HistoryChange>();
			CreateMap<Data.Histories.HistoryChange, Domain.Histories.HistoryChange>();

			CreateMap<Data.Histories.History, Domain.Histories.History>();
			CreateMap<Domain.Histories.History, Data.Histories.History>();
		}
	}
}