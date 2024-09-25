using Microsoft.EntityFrameworkCore;
using TodoApi.Data;

namespace TodoApi.DataContext.Data
{
    public static class DbInitializer
    {
        public static void Initialize(IServiceProvider serviceProvider)
        {
            using (var _context = new AppDbContext(serviceProvider.
                GetRequiredService<DbContextOptions<AppDbContext>>()))
            {
                if (_context.TodoItems.Any()) return;

                _context.TodoItems.AddRange(
                    new Models.TodoItem { Id = 1, Task= "Hacer el desayuno", IsComplete= false},
                    new Models.TodoItem { Id = 2, Task = "Hacer el almuerzo", IsComplete = false }
                );

                _context.SaveChanges();
            }
        }
    }
}
