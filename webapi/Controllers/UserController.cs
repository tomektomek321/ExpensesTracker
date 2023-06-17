using Azure;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Migrations.Operations;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace webapi.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase {
        private readonly ILogger<UserController> _logger;
        private Data.ExpensesDbContext _context;
        private UserManager<Data.Models.User> _usersManager;
        private readonly IConfiguration _configuration;
        public UserController(ILogger<UserController> pLogger, Data.ExpensesDbContext pContext, UserManager<Data.Models.User> pUsersManager, IConfiguration pConfiguration) {
            _logger = pLogger;
            _context = pContext;
            _usersManager = pUsersManager;
            _configuration = pConfiguration;
        }
        [HttpPost("register")]
        public async Task<ActionResult> RegisterUser(Models.UserRegistration pNewUser) {
            var userExists = await _usersManager.FindByNameAsync(pNewUser.Username);
            if (userExists != null)
                return StatusCode(StatusCodes.Status400BadRequest);

            Data.Models.User user = new Data.Models.User() {
                Email = pNewUser.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = pNewUser.Username
            };

            var result = await _usersManager.CreateAsync(user, pNewUser.Password);
            if (!result.Succeeded)
                return StatusCode(StatusCodes.Status500InternalServerError, result.Errors);

            return Ok();
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] Models.UserLogin pUserLogin) {
            var user = await _usersManager.FindByNameAsync(pUserLogin.Username);
            if (user != null && await _usersManager.CheckPasswordAsync(user, pUserLogin.Password)) {
                var userRoles = await _usersManager.GetRolesAsync(user);

                var authClaims = new List<Claim>
                {
            new Claim(ClaimTypes.Name, user.UserName),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
        };

                foreach (var userRole in userRoles) {
                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: _configuration["JWT:ValidIssuer"],
                    audience: _configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                return Ok(new {
                    token = new JwtSecurityTokenHandler().WriteToken(token),
                    expiration = token.ValidTo
                });
            }
            return Unauthorized();
        }
    }
}
