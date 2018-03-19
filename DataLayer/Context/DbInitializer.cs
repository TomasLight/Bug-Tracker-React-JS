using DataLayer.Enums;
using DataLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;

namespace DataLayer.Context
{
    public static class DbInitializer
    {
        public static void Initialize(BugContext context)
        {
            context.Database.EnsureCreated();

            if (context.Users.Any())
            {
                return;
            }

            context.AddToContext(GetUserList());
            context.AddToContext(GetBugList());
            context.AddToContext(GetHistories(context));
        }

        private static List<User> GetUserList()
        {
            return new List<User>()
            {
                new User(){ Login = "QA", Password = "test", LastName = "Andrey", FirstName = "Zaitcev"},
                new User(){ Login = "Developer1", Password = "dev", LastName = "Devloper", FirstName = "First"},
                new User(){ Login = "Developer2", Password = "dev", LastName = "Devloper", FirstName = "Second"},
            };
        }

        private static List<Bug> GetBugList()
        {
            return new List<Bug>()
            {
                new Bug(){ Name = "Неисправность валидации" },
                new Bug(){ Name = "Ошибка в UI" },
                new Bug(){ Name = "Нарушение логики" },
                new Bug(){ Name = "Некорректная сортировка" },
                new Bug(){ Name = "Пропадает кнопка печати на экране отчеты" }
            };
        }

        private static List<History> GetHistories(BugContext context)
        {
            List<History> histories = new List<History>();
            if (context.Users.Count() < 3 || context.Bugs.Count() < 1)
                return histories;

            List<User> users = context.Users.ToList();

            histories.AddRegistryHistory(users, context.Bugs.ToList());
            histories.AddHistory1(users, context.Bugs.FirstOrDefault());
            histories.AddHistory2(users, context.Bugs.FirstOrDefault(b => b.Name == "Нарушение логики"));
            histories.AddHistory3(users, context.Bugs.FirstOrDefault(b => b.Name == "Пропадает кнопка печати на экране отчеты"));

            return histories;
        }
    }

    internal static class LocalExtensions
    {
        internal static BugContext AddToContext<T>(this BugContext context, List<T> listEntities) where T : class
        {
            var type = typeof(T);
            if (!type.Equals(typeof(Bug))
                && !type.Equals(typeof(History))
                && !type.Equals(typeof(HistoryPriority))
                && !type.Equals(typeof(HistoryReproSteps))
                && !type.Equals(typeof(HistorySeverity))
                && !type.Equals(typeof(HistoryStatus))
                && !type.Equals(typeof(User)))
                return context;

            foreach (T entity in listEntities)
            {
                context.Attach(entity);
            }
            context.SaveChanges();
            return context;
        }

        /// <summary>
        /// Формирование истории: регистрация ошибок в системе
        /// </summary>
        /// <param name="userQA">Пользователь, который обнаружил ошибки (тестер)</param>
        /// <param name="bugs">Список зарегистрированных ошибок</param>
        /// <returns></returns>
        internal static List<History> AddRegistryHistory(this List<History> historyList, List<User> users, List<Bug> bugs)
        {
            if (users.Count() < 1 || bugs.Count < 1)
                return historyList;

            User userQA = users.FirstOrDefault();
            int day = 0;
            int month = 1;
            int year = 2018;
            foreach (Bug bug in bugs)
            {
                day++;
                if (day > 28)
                {
                    month++;
                    day = 1;
                }
                if (month > 12)
                {
                    year++;
                    month = 1;
                }

                History history = new History(userQA, bug, new DateTime(year, month, day, 10, 00, 00));
                history.Regitry("Новый баг", "Некоторое описание ошибки");
                historyList.Add(history);
            }
            return historyList;
        }

        internal static List<History> AddHistory1(this List<History> historyList, List<User> users, Bug variesBug)
        {
            if (users.Count() < 3 || variesBug == null)
                return historyList;

            User userQA = users.FirstOrDefault();
            User developer1 = users[1];
            User developer2 = users[2];

            DateTime lastDate = historyList.OrderBy(h => h.DateUpdate).LastOrDefault().DateUpdate;
            lastDate = lastDate.AddDays(1);

            History history = new History(developer1, variesBug, lastDate);
            history.SetNewStatus(Status.Opened, "В разработке");
            history.SetNewPriority(Urgency.First);
            historyList.Add(history);

            lastDate = lastDate.AddHours(1);
            history = new History(developer1, variesBug, lastDate);
            history.SetNewStatus(Status.Resolved, "Проблема решена");
            historyList.Add(history);

            lastDate = lastDate.AddHours(1);
            history = new History(userQA, variesBug, lastDate);
            history.SetNewStatus(Status.Opened, "Всё еще есть ошибки");
            history.SetNewRepoSteps("Проверить вывод отчетов. Съехали даты");
            historyList.Add(history);

            lastDate = lastDate.AddHours(1);
            history = new History(developer2, variesBug, lastDate);
            history.SetNewStatus(Status.Resolved, "Исправлено");
            history.SetNewSeverity(Criticality.High);
            historyList.Add(history);

            lastDate = lastDate.AddHours(1);
            history = new History(userQA, variesBug, lastDate);
            history.SetNewStatus(Status.Closed, "Закрываю баг. Всё работает");
            historyList.Add(history);

            return historyList;
        }

        internal static List<History> AddHistory2(this List<History> historyList, List<User> users, Bug variesBug)
        {
            if (users.Count() < 2 || variesBug == null)
                return historyList;

            User userQA = users.FirstOrDefault();
            User developer1 = users[1];

            DateTime lastDate = historyList.OrderBy(h => h.DateUpdate).LastOrDefault().DateUpdate;
            lastDate = lastDate.AddDays(1);

            History history = new History(userQA, variesBug, lastDate);
            history.SetNewPriority(Urgency.First);
            history.SetNewSeverity(Criticality.Critical);
            historyList.Add(history);

            lastDate = lastDate.AddHours(1);
            history = new History(developer1, variesBug, lastDate);
            history.SetNewStatus(Status.Opened, "Занимаюсь исправлением");
            historyList.Add(history);

            lastDate = lastDate.AddHours(1);
            history = new History(userQA, variesBug, lastDate);
            history.SetNewRepoSteps("Неверный шрифт в разделе 'Копия'");
            historyList.Add(history);

            return historyList;
        }

        internal static List<History> AddHistory3(this List<History> historyList, List<User> users, Bug variesBug)
        {
            if (users.Count() < 2 || variesBug == null)
                return historyList;

            User userQA = users.FirstOrDefault();
            User developer1 = users[1];

            DateTime lastDate = historyList.OrderBy(h => h.DateUpdate).LastOrDefault().DateUpdate;
            lastDate = lastDate.AddDays(1);

            History history = new History(developer1, variesBug, lastDate);
            history.SetNewStatus(Status.Opened, "Занимаюсь исправлением");
            historyList.Add(history);

            lastDate = lastDate.AddHours(1);
            history = new History(userQA, variesBug, lastDate);
            history.SetNewStatus(Status.Resolved, "Проблема устранена");
            historyList.Add(history);

            return historyList;
        }
    }
}
