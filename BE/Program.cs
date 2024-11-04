using API.Data;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlServer("Server=(localdb)\\mssqllocaldb;Database=DatingDb;Trusted_Connection=True;");
});
var app = builder.Build();

app.MapControllers();

app.Run();
