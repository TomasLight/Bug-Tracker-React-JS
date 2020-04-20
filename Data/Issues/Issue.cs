using System;

namespace Data.Issues
{
	public class Issue : IEntityModel
	{
		public int Id { get; set; }
		
		public int Type { get; set; }

		public int ReporterId { get; set; }

		public string Title { get; set; }
		
		public string Description { get; set; }
		
		public int Urgency { get; set; }
		
		public int Severity { get; set; }
		
		public int Status { get; set; }
		
		public DateTime Date { get; set; }
	}
}