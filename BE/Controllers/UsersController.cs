using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseController
    {
        private readonly DataContext _context;
        public UsersController(DataContext context) 
        { 
            _context = context;
        }

        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> Get() 
        {
            List<AppUser> users = await _context.Users.ToListAsync();

            return Ok(users);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> Get(int id)
        {
            AppUser? user = await _context.Users.FindAsync(id);

            if (user == null) return NotFound();

            return Ok(user);
        }
    }
}
