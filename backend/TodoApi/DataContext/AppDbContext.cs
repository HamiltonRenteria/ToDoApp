using Microsoft.EntityFrameworkCore;
using TodoApi.Models;

namespace TodoApi.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> context): base(context) { }

        public DbSet<TodoItem> TodoItems { get; set; }
    }
}
