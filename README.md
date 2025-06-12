# Greeting API

This project is an ASP.NET Core Web API that provides a personalized greeting. It is secured using JWT authentication and containerized using Docker.

## Prerequisites

- Docker Desktop (or Docker Engine and Docker Compose) installed.
- A tool capable of making HTTP requests (e.g., `curl`, Postman).
- A way to generate JWTs for testing (see "Testing the API" section).

## Running the Application

1.  **Clone the repository (if you haven't already):**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Build and run the application using Docker Compose:**
    ```bash
    docker-compose build
    docker-compose up -d
    ```
    The `-d` flag runs the containers in detached mode. The API will be available on `http://localhost:8080` and `https://localhost:8081`.

## API Endpoint

-   **`GET /api/greet`**
    -   Requires JWT authentication.
    -   Returns a personalized greeting based on the `name` or `email` claim in the JWT.
    -   Example response: `Hello, YourName!`

## Testing the API

To test the `/api/greet` endpoint, you need to include a valid JWT in the `Authorization` header of your request.

**1. Generating a JWT:**

The application is configured with the following JWT parameters (in `GreetingApi/Program.cs`):
    -   **Issuer:** `YourIssuer`
    -   **Audience:** `YourAudience`
    -   **Secret Key:** `YourSuperSecretKey123!` (This is a placeholder and should be kept secret in a real application)

You can use an online JWT debugger/generator (like [jwt.io](https://jwt.io/)) or a command-line tool to create a token. Ensure the payload includes a `name` or `email` claim.

**Example Payload:**
```json
{
  "sub": "testuser",
  "name": "Your Name",
  "email": "your.email@example.com",
  "iss": "YourIssuer",
  "aud": "YourAudience",
  "exp": <timestamp_for_future_date>, // e.g., 1 hour from now
  "iat": <timestamp_for_current_date>
}
```
Sign this payload using the HS256 algorithm and the secret key `YourSuperSecretKey123!`.

**2. Making an Authenticated Request:**

Replace `YOUR_GENERATED_JWT` with the token you created.

Using `curl`:
```bash
curl -X GET "http://localhost:8080/api/greet" -H "Authorization: Bearer YOUR_GENERATED_JWT"
```

Or for HTTPS (you might need to tell curl to ignore self-signed cert issues if testing locally without a trusted dev cert in the container):
```bash
curl -k -X GET "https://localhost:8081/api/greet" -H "Authorization: Bearer YOUR_GENERATED_JWT"
```

If the token is valid and contains a `name` claim, you should see a response like:
```
Hello, Your Name!
```
If it contains an `email` claim (and no `name` claim), you'll see:
```
Hello, your.email@example.com!
```
If the token is invalid, missing, or doesn't contain recognized claims, you'll get an appropriate HTTP error (e.g., 401 Unauthorized) or the default greeting.

## Stopping the Application

```bash
docker-compose down
```
