using Carter;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.AspNetCore.WebSockets;
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
    .Services.AddSignalR()
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

        x.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                var accessToken = context.Request.Query["access_token"];

                // If the request is for our hub...
                var path = context.HttpContext.Request.Path;

                if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/api/hubs"))
                {
                    // Read the token out of the query string
                    context.Token = accessToken;
                }

                return Task.CompletedTask;
            },
        };
    });

builder.Services.AddAuthorization();
builder.Services.AddCarter();

builder.Services.AddCors(x =>
{
    x.AddDefaultPolicy(p =>
        p.AllowCredentials().AllowAnyHeader().AllowAnyMethod().SetIsOriginAllowed(_ => true)
    );

    x.AddPolicy(
        "SignalR",
        p =>
            p.AllowCredentials()
                .AllowAnyHeader()
                .WithMethods("GET", "POST")
                .SetIsOriginAllowed(_ => true)
    );
});

builder.Services.AddSingleton<AuthService>();
builder.Services.AddSingleton<UserService>();
builder.Services.AddSingleton<HospitalService>();
builder.Services.AddSingleton(x => EntityStore.CreateInMemory());

builder.Services.AddHostedService<AutoPersistingService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseRouting();
app.UseCors();

app.UseAuthentication();
app.UseAuthorization();

app.MapCarter();

app.MapHub<HospitalHub>("/api/hubs/hospital").RequireCors("SignalR");

app.Run();
