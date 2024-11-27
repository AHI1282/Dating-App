namespace API.DTOs.InputDTOs
{
    public class LoginInputDto
    {
        public required string UserName { get; set; }
        public required string Password { get; set; }
    }
}
