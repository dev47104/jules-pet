# Use the official ASP.NET Core runtime image as a parent image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 8080
EXPOSE 8081

# Use the official .NET SDK image to build the app
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src
COPY ["GreetingApi.csproj", "./"]
RUN dotnet restore "./GreetingApi.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "GreetingApi.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "GreetingApi.csproj" -c Release -o /app/publish /p:UseAppHost=false

# Build runtime image
FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "GreetingApi.dll"]
