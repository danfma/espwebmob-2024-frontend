using Carter;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using NetTopologySuite.IO.Converters;
using PatientTransfer.Server.Hubs;
using PatientTransfer.Server.Services.Auth;
using PatientTransfer.Server.Services.Clinic;
using PatientTransfer.Server.Services.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// configuring the SignalR's JSON serialization and error handling
builder
    .Services.AddSignalR(x => x.EnableDetailedErrors = builder.Environment.IsDevelopment())
    .AddJsonProtocol(x => x.PayloadSerializerOptions.Converters.Add(new GeoJsonConverterFactory()));

// configuring the Http JSON serialization
builder.Services.ConfigureHttpJsonOptions(x =>
    x.SerializerOptions.Converters.Add(new GeoJsonConverterFactory())
);

builder
    .Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(x =>
    {
        x.RequireHttpsMetadata = false;
        x.SaveToken = true;
        x.TokenValidationParameters = new TokenValidationParameters()
        {
            ValidateIssuerSigningKey = true,
            ValidateIssuer = false,
            ValidateAudience = false,
            IssuerSigningKey = new SymmetricSecurityKey(AuthService.SecretBytes),
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddCarter();

builder.Services.AddSingleton<AuthService>();
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<HospitalService>();
builder.Services.AddSingleton(x => EntityStore.CreateInMemory());

builder.Services.AddHostedService<AutoPersistingService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi().CacheOutput();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapCarter();
app.MapHub<HospitalHub>("/api/hubs/hospital").RequireAuthorization();

app.Run();
