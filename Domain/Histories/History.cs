using System;
using System.Collections.Generic;
using Domain.Issues;
using Domain.Users;

namespace Domain.Histories
{
	public class History : IDomainModel
	{
		public int Id { get; set; }
		
		/// <summary>
		/// What was changed
		/// </summary>
		public Issue Issue { get; set; }
		public int IssueId { get; set; }

		/// <summary>
		/// Who did changes
		/// </summary>
		public User Updater { get; set; }
		public int UpdaterId { get; set; }

		public DateTime Date { get; set; }

		public ICollection<HistoryChange> Changes { get; set; }
	}
}