using API.Data;
using API.DTOs.InputDTOs;
using API.DTOs.OutputDTOs;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountsController : BaseController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;
        public AccountsController(DataContext context, ITokenService tokenService)
        {
            _context = context;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<ActionResult<LoginOutputDto>> Register(RegisterInputDto input)
        {
            if (await _context.Users.AnyAsync(x => x.UserName.ToLower() == input.UserName.ToLower()))
            {
                throw new Exception("Username is taken");
            }

            using var hmac = new HMACSHA512();

            var newUser = new AppUser
            {
                UserName = input.UserName,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(input.Password)),
                PasswordSalt = hmac.Key,
                City = "",
                Country = "",
                Gender = "",
                KnownAs = ""
            };

            await _context.Users.AddAsync(newUser);
            await _context.SaveChangesAsync();

            return new LoginOutputDto
            {
                UserName = newUser.UserName,
                Token = _tokenService.CreateToken(newUser)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<LoginOutputDto>> Login(LoginInputDto input)
        {
            AppUser? user = await _context.Users
                .FirstOrDefaultAsync(x => x.UserName.ToLower() == input.UserName.ToLower());

            if (user == null) throw new Exception("Invalid username!");

            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computerHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(input.Password));

            for (int i = 0; i < computerHash.Length; i++)
            {
                if (computerHash[i] != user.PasswordHash[i]) throw new Exception("Invalid password!");
            }

            return new LoginOutputDto
            {
                Id = user.Id,
                UserName = user.UserName,
                Token = _tokenService.CreateToken(user)
            };
        }

    }
}
