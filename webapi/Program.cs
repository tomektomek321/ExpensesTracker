using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using webapi.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.AspNetCore.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
var connectionString = builder.Configuration.GetConnectionString("ExpensesTrackerDbConnection");
builder.Services.AddControllers();
builder.Services.AddDbContext<ExpensesDbContext>(options =>
    options.UseSqlServer(connectionString));
builder.Services.AddIdentity<webapi.Data.Models.User, webapi.Data.Models.Role>()
        .AddEntityFrameworkStores<ExpensesDbContext>()
        .AddDefaultTokenProviders();
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddAuthentication(auth =>
{
    auth.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    auth.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
   .AddJwtBearer(options => {
       options.TokenValidationParameters = new TokenValidationParameters {
           ValidateIssuer = true,
           ValidateAudience = true,
           ValidAudience = builder.Configuration["JWT:ValidAudience"],
           ValidIssuer = builder.Configuration["JWT:ValidIssuer"],
           RequireExpirationTime = true,
           IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["JWT:Secret"])),
           ValidateIssuerSigningKey = true
       };
   });
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
