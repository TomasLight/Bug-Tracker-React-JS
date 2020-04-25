using API.Configuration.Mappings;
using Autofac;
using AutoMapper;
using Data.Histories;
using Data.Issues;
using Data.Users;
using Domain.Histories;
using Domain.Issues;
using Domain.Services;
using Domain.Users;

namespace API.Configuration
{
	public class IoC
	{
		private readonly ContainerBuilder _containerBuilder;
		public IoC(ContainerBuilder containerBuilder)
		{
			_containerBuilder = containerBuilder;
		}

		public IoC RegisterMapper()
		{
			var mapper = Mapping.CreateMapper();
			_containerBuilder.RegisterInstance(mapper).As<IMapper>();

			return this;
		}

		public IoC RegisterFakeRepositories()
		{
			_containerBuilder.RegisterType<Data.Fake.UserRepository>().As<IUserRepository>();
			_containerBuilder.RegisterType<Data.Fake.HistoryRepository>().As<IHistoryRepository>();
			_containerBuilder.RegisterType<Data.Fake.IssueRepository>().As<IIssueRepository>();

			return this;
		}

		public IoC RegisterServices()
		{
			_containerBuilder.RegisterType<UserService>().As<IUserService>();
			_containerBuilder.RegisterType<HistoryService>().As<IHistoryService>();
			_containerBuilder.RegisterType<IssueService>().As<IIssueService>();

			return this;
		}
	}
}