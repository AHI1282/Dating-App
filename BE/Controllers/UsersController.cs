using API.Data;
using API.DTOs.InputDTOs;
using API.DTOs.OutputDTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace API.Controllers
{
    [Authorize]
    public class UsersController : BaseController
    {
        private readonly DataContext _context;
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        public UsersController(DataContext context, IUserRepository userRepository, IMapper mapper) 
        { 
            _context = context;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserOutputDto>>> Get() 
        {
            var users = await _userRepository.GetAllAsync();

            return Ok(_mapper.Map<IEnumerable<UserOutputDto>>(users));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserOutputDto>> Get(int id)
        {
            AppUser? user = await _userRepository.GetByIdAsync(id);

            if (user == null) return NotFound();

            return Ok(_mapper.Map<UserOutputDto>(user));
        }

        [HttpPut]
        public async Task<ActionResult> Put(UserUpdateInputDto input)
        {
            string userName = User.FindFirst(ClaimTypes.NameIdentifier)!.Value;

            if(userName == null) return BadRequest("No username found in token!");

            AppUser? user = await _userRepository.GetByNameAsync(userName);

            if (user == null) return BadRequest($"User not found with name {userName}!");

            _mapper.Map(input, user);

            _userRepository.Update(user);

            if (await _userRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Unable to update user!");
        }
    }
}
