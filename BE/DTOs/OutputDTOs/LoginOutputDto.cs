namespace API.DTOs.OutputDTOs
{
    public class LoginOutputDto
    {
        public int Id { get; set; }
        public required string UserName { get; set; }
        public required string Token { get; set; }
    }
}
