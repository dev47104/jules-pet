using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization; // Will be used later
using System.Security.Claims;

namespace GreetingApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GreetController : ControllerBase
    {
        private readonly IGreetingService _greetingService;

        public GreetController(IGreetingService greetingService)
        {
            _greetingService = greetingService;
        }

        [HttpGet]
        [Authorize] // This will be uncommented later after JWT setup
        public IActionResult GetGreeting()
        {
            // Placeholder for claim extraction logic
            // For now, we'll pass nulls, which GreetingService handles
            var name = User.FindFirst(ClaimTypes.Name)?.Value;
            var email = User.FindFirst(ClaimTypes.Email)?.Value;

            return Ok(_greetingService.GetGreeting(name, email));
        }
    }
}
