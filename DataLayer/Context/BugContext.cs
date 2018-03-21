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

        //protected override void OnModelCreating(ModelBuilder modelBuilder)
        //{
        //    base.OnModelCreating(modelBuilder);
        //}
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<History>().HasKey(h => new { h.BugId, h.UserId, h.DateUpdate});
        }
    }
}
