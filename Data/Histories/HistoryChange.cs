namespace Data.Histories
{
	public class HistoryChange : IEntityModel
	{
		public int HistoryId { get; set; }

		public string FieldName { get; set; }

		public string ValueBefore { get; set; }
		
		public string ValueAfter { get; set; }
	}
}