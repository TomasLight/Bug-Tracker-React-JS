using System;
using System.Collections.Generic;

namespace Data.Histories
{
	public class History : IEntityModel
	{
		public int Id { get; set; }
		
		public int IssueId { get; set; }

		public int UpdaterId { get; set; }

		public DateTime Date { get; set; }

		public virtual ICollection<HistoryChange> Changes { get; set; }
	}
}