using DataLayer.Models;
using Microsoft.EntityFrameworkCore;

namespace DataLayer.Context
{
    public class BugContext : DbContext
    {
        public BugContext(DbContextOptions<BugContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Bug> Bugs { get; set; }
        public DbSet<History> Histories { get; set; }
        public DbSet<HistoryPriority> HistoriesPriority { get; set; }
        public DbSet<HistoryReproSteps> HistoriesReproSteps { get; set; }
        public DbSet<HistorySeverity> HistoriesSeverity { get; set; }
        public DbSet<HistoryStatus> HistoriesStatus { get; set; }

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //}
    }
}
