using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        public UserRepository(DataContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<AppUser>> GetAllAsync()
        {
            return await _context.Users
                .Include(i => i.Photos)
                .ToListAsync();
        }

        public async Task<AppUser?> GetByIdAsync(int id)
        {
            return await _context.Users
                .Include(i => i.Photos)
                .SingleOrDefaultAsync(x => x.Id == id);
        }

        public async Task<AppUser?> GetByNameAsync(string name)
        {
            return await _context.Users.Include(i => i.Photos).SingleOrDefaultAsync(x => x.UserName == name);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }
    }
}
