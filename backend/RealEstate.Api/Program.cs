using MongoDB.Driver;

var builder = WebApplication.CreateBuilder(args);

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
        policy => policy.WithOrigins("http://localhost:3000")
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
app.MapControllers();
app.Run();
