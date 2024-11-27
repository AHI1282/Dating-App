using System.ComponentModel.DataAnnotations;

namespace API.DTOs.InputDTOs
{
    public class RegisterInputDto
    {
        [Required]
        public required string UserName { get; set; }
        [Required]
        public required string Password { get; set; }
    }
}
