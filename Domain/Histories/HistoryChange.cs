namespace Domain.Histories
{
	public class HistoryChange : IDomainModel
	{
		public int HistoryId { get; set; }

		public string FieldName { get; set; }

		public string ValueBefore { get; set; }
		
		public string ValueAfter { get; set; }
	}
}