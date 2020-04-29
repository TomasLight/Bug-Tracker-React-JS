using System;
using System.Collections.Generic;
using Domain.Histories;
using Domain.Issues;

namespace Domain.Services
{
	public class HistoryChangesBuilder
	{
		private readonly Issue _issue1;
		private readonly Issue _issue2;
		private readonly IList<HistoryChange> _changes;

		public HistoryChangesBuilder(Issue issue1, Issue issue2)
		{
			_issue1 = issue1;
			_issue2 = issue2;
			_changes = new List<HistoryChange>();
		}

		public void AppendDiff(string propertyName, Func<Issue, object> getValueExpression)
		{
			var value1 = getValueExpression(_issue1).ToString();
			var value2 = getValueExpression(_issue2).ToString();

			if (value1 == value2)
			{
				return;
			}

			var change = new HistoryChange
			{
				FieldName = propertyName,
				ValueBefore = value1,
				ValueAfter = value2,
			};
			_changes.Add(change);
		}

		public IList<HistoryChange> Build()
		{
			return _changes;
		}
	}
}