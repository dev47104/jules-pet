namespace GreetingApi
{
    public interface IGreetingService
    {
        string GetGreeting(string? name, string? email);
    }

    public class GreetingService : IGreetingService
    {
        public string GetGreeting(string? name, string? email)
        {
            if (!string.IsNullOrEmpty(name))
            {
                return $"Hello, {name}!";
            }
            if (!string.IsNullOrEmpty(email))
            {
                return $"Hello, {email}!";
            }
            return "Hello, World!"; // Default greeting if no claim is found
        }
    }
}
