using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

// Configure port for Railway
var port = Environment.GetEnvironmentVariable("PORT") ?? "8080";
builder.WebHost.UseUrls($"http://0.0.0.0:{port}");

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Read MongoDB Settings using GetSection (works with ENV VARS)
builder.Services.AddSingleton<IMongoDatabase>(sp =>
{
    var configuration = sp.GetRequiredService<IConfiguration>();

    // Primero buscamos la variable de entorno (AWS usa __ en vez de :)
    var connectionString = Environment.GetEnvironmentVariable("MongoDbSettings__ConnectionString")
                          ?? configuration["MongoDbSettings:ConnectionString"];

    var databaseName = Environment.GetEnvironmentVariable("MongoDbSettings__DatabaseName")
                      ?? configuration["MongoDbSettings:DatabaseName"];

    // Log de diagnóstico
    Console.WriteLine($"=== MONGODB DIAGNOSTICS ===");
    Console.WriteLine($"ConnectionString from ENV: {!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("MongoDbSettings__ConnectionString"))}");
    Console.WriteLine($"DatabaseName from ENV: {!string.IsNullOrEmpty(Environment.GetEnvironmentVariable("MongoDbSettings__DatabaseName"))}");
    Console.WriteLine($"Final ConnectionString exists: {!string.IsNullOrEmpty(connectionString)}");
    Console.WriteLine($"Final DatabaseName: {databaseName}");
    Console.WriteLine($"=== END DIAGNOSTICS ===");

    if (string.IsNullOrEmpty(connectionString))
    {
        throw new InvalidOperationException("MongoDB connection string is not configured");
    }

    if (string.IsNullOrEmpty(databaseName))
    {
        throw new InvalidOperationException("MongoDB database name is not configured");
    }

    var client = new MongoClient(connectionString);
    return client.GetDatabase(databaseName);
});

// Register application services
builder.Services.AddScoped<RealEstate.Api.Interfaces.IPropertyService, RealEstate.Api.Services.PropertyService>();
builder.Services.AddScoped<RealEstate.Api.Interfaces.IOwnerService, RealEstate.Api.Services.OwnerService>();
builder.Services.AddScoped<RealEstate.Api.Interfaces.IPropertyTraceService, RealEstate.Api.Services.PropertyTraceService>();
builder.Services.AddSingleton<RealEstate.Api.Services.S3Service>();
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins(
                            "http://localhost:3000", // Desarrollo local
                            "https://realestatetest-inky.vercel.app" // Producción en Vercel
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});
builder.Services.AddControllers();
builder.Services.AddSingleton<RealEstate.Api.Services.S3Service>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("AllowFrontend");

// Health check endpoint para Railway
app.MapGet("/", () => "API is running! 🚀");
app.MapGet("/health", () => "Healthy");

app.MapControllers();
app.Run();
