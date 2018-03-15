using Bugs.Models.Enums;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Bugs.Models.Context
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

            List<User> users = GetUserList();
            foreach (User user in users)
            {
                context.Users.Add(user);
            }
            context.SaveChanges();

            List<Bug> bugs = GetBugList();
            foreach (Bug bug in bugs)
            {
                context.Bugs.Add(bug);
            }
            context.SaveChanges();

            CreateHistories(context);
            context.SaveChanges();
        }

        private static List<User> GetUserList()
        {
            return new List<User>()
            {
                new User(){ Login = "QA", Password = "tester", LastName = "test1 LN", FirstName = "test1 FN"},
                new User(){ Login = "Developer1", Password = "developer", LastName = "test2 LN", FirstName = "test2 FN"},
                new User(){ Login = "Developer2", Password = "developer", LastName = "test3 LN", FirstName = "test3 FN"},
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
            };
        }
                
        private static void CreateHistories(BugContext context)
        {
            if (context.Users.Count() < 1)
                return;

            // registring new bugs 

            User userQA = context.Users.FirstOrDefault();
            List<History> histories = RegistringBugs(userQA, context.Bugs.ToList());
            if (histories != null)
                foreach (History history in histories)
                {
                    context.Histories.Add(history);
                }

            // new history for first bug
            
            histories = GenerateHistoryChanges(context.Users.ToList(), context.Bugs.FirstOrDefault());
            if(histories != null)
                foreach (History history in histories)
                {
                    context.Histories.Add(history);
                }
        }

        /// <summary>
        /// Формирование истории: регистрация ошибок в системе
        /// </summary>
        /// <param name="userQA">Пользователь, который обнаружил ошибки (тестер)</param>
        /// <param name="bugs">Список зарегистрированных ошибок</param>
        /// <returns></returns>
        private static List<History> RegistringBugs(User userQA, List<Bug> bugs)
        {
            if (userQA == null || bugs.Count < 1)
                return null;

            List<History> historyList = new List<History>();
            int day = 11;
            int hour = 14;
            foreach (Bug bug in bugs)
            {
                History history = new History(userQA, bug, new DateTime(2018, 01, day, hour, 00, 00));
                history.Regitry("Новый баг", "Некоторое описание ошибки");
                historyList.Add(history);
                day++;
                hour++;
            }
            return historyList;
        }

        /// <summary>
        /// Формирование истории изменения одной ошибки
        /// </summary>
        /// <param name="users">Список зарегистрированных пользователей</param>
        /// <param name="variesBug">Ошибка, для которой формируется история</param>
        /// <returns></returns>
        private static List<History> GenerateHistoryChanges(List<User> users, Bug variesBug)
        {
            if (users.Count() < 3 || variesBug == null)
                return null;

            User userQA = users.FirstOrDefault();
            User developer1 = users[1];
            User developer2 = users[2];

            List<History> historyList = new List<History>();

            History history = new History(developer1, variesBug, new DateTime(2018, 02, 01, 10, 00, 00));
            history.SetNewStatus(Status.Opened, "В разработке");
            history.SetNewPriority(Urgency.First);
            historyList.Add(history);

            history = new History(developer1, variesBug, new DateTime(2018, 02, 01, 12, 00, 00));
            history.SetNewStatus(Status.Resolved, "Проблема решена");
            historyList.Add(history);

            history = new History(userQA, variesBug, new DateTime(2018, 02, 01, 15, 00, 00));
            history.SetNewStatus(Status.Opened, "Всё еще есть ошибки");
            history.SetNewRepoSteps("Проверить вывод отчетов. Съехали даты");
            historyList.Add(history);

            history = new History(developer2, variesBug, new DateTime(2018, 02, 01, 18, 00, 00));
            history.SetNewStatus(Status.Resolved, "Исправлено");
            history.SetNewSeverity(Criticality.High);
            historyList.Add(history);

            history = new History(userQA, variesBug, new DateTime(2018, 02, 02, 11, 00, 00));
            history.SetNewStatus(Status.Closed, "Закрываю баг. Всё работает");
            historyList.Add(history);

            return historyList;
        }
    }
}
