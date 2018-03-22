using DataLayer.Enums;
using DataLayer.Models;
using Microsoft.EntityFrameworkCore;
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
            if (context.Users.Count() < 1)
                return;

            context.AddToContext(GetBugList(context.Users.FirstOrDefault()));
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

        private static List<Bug> GetBugList(User creator)
        {
            return new List<Bug>()
            {
                new Bug("Неисправность валидации", creator),
                new Bug("Ошибка в UI", creator),
                new Bug("Нарушение логики", creator),
                new Bug("Некорректная сортировка", creator),
                new Bug("Пропадает кнопка печати на экране отчеты", creator)
            };
        }

        private static List<History> GetHistories(BugContext context)
        {
            List<History> histories = new List<History>();
            if (context.Users.Count() < 3 || context.Bugs.Count() < 1)
                return histories;

            List<User> users = context.Users.ToList();

            foreach (Bug b in context.Bugs)
            {
                histories.AddHistory(b, users.FirstOrDefault(), Status.New, "create bug");
            }

            Bug bug = context.Bugs.FirstOrDefault();
            histories.AddHistory1(users, bug);
            context.Entry(bug).State = EntityState.Modified;

            if (users.Count() > 1)
            {
                bug = context.Bugs.FirstOrDefault(b => b.Name == "Нарушение логики");
                histories.AddHistory2(users[1], bug);
                context.Entry(bug).State = EntityState.Modified;
            }

            bug = context.Bugs.FirstOrDefault(b => b.Name == "Пропадает кнопка печати на экране отчеты");
            histories.AddHistory3(users, bug);
            context.Entry(bug).State = EntityState.Modified;

            return histories;
        }
    }

    internal static class LocalExtensions
    {
        private static DateTime _lastDate;

        internal static BugContext AddToContext<T>(this BugContext context, List<T> listEntities) where T : class
        {
            var type = typeof(T);
            if (!type.Equals(typeof(Bug))
                && !type.Equals(typeof(History))
                && !type.Equals(typeof(User)))
                return context;

            foreach (T entity in listEntities)
            {
                context.Attach(entity);
            }
            context.SaveChanges();
            return context;
        }

        internal static List<History> AddHistory(this List<History> historyList, Bug bug, User user, Status status, string comment)
        {
            _lastDate = _lastDate != null ? _lastDate.AddHours(1) : DateTime.Now;
            historyList.Add(new History(user, bug, _lastDate, status, comment));
            return historyList;
        }

        internal static List<History> AddHistory1(this List<History> historyList, List<User> users, Bug variesBug)
        {
            if (users.Count() < 3 || variesBug == null)
                return historyList;

            User userQA = users.FirstOrDefault();
            User developer1 = users[1];
            User developer2 = users[2];

            _lastDate = DateTime.Now;

            historyList.AddHistory(variesBug, developer1, Status.Opened, "В разработке");
            historyList.AddHistory(variesBug, developer1, Status.Resolved, "Проблема решена");
            historyList.AddHistory(variesBug, userQA, Status.Opened, "Всё еще есть ошибки");
            historyList.AddHistory(variesBug, developer2, Status.Resolved, "Исправлено");
            historyList.AddHistory(variesBug, userQA, Status.Closed, "Закрываю баг. Всё работает");

            variesBug.Status = Status.Closed;

            return historyList;
        }

        internal static List<History> AddHistory2(this List<History> historyList, User user, Bug variesBug)
        {
            if (user == null || variesBug == null)
                return historyList;
            
            _lastDate = _lastDate.AddDays(1);            
            historyList.AddHistory(variesBug, user, Status.Opened, "Занимаюсь исправлением");

            variesBug.Status = Status.Opened;

            return historyList;
        }

        internal static List<History> AddHistory3(this List<History> historyList, List<User> users, Bug variesBug)
        {
            if (users.Count() < 2 || variesBug == null)
                return historyList;

            User userQA = users.FirstOrDefault();
            User developer1 = users[1];
            
            _lastDate = _lastDate.AddDays(1);
            historyList.AddHistory(variesBug, developer1, Status.Opened, "Занимаюсь исправлением");
            historyList.AddHistory(variesBug, userQA, Status.Resolved, "Проблема устранена");

            variesBug.Status = Status.Resolved;

            return historyList;
        }
    }
}
