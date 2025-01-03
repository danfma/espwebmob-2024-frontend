using Carter;
using PatientTransfer.Server.Data;
using PatientTransfer.Server.Hubs;
using PatientTransfer.Server.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddSignalR();
builder.Services.AddSingleton<AuthService>();
builder.Services.AddCarter();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

//app.UseHttpsRedirection();

app.MapGet(
    "/api/hospital/{id}",
    (string id) =>
    {
        var doctors = new[]
        {
            new Doctor(
                "doctor-a",
                "Doctor A",
                "CRM111",
                new Speciality("sp-1", "Cardiology"),
                PersonType.Regulator
            ),
        };

        var rooms = new[]
        {
            new Room("room-1", []),
            new Room(
                "room-2",
                [
                    new Bed(
                        new Patient("patient-a", "Patient A", 12, "123.456.789-00", doctors[0].Id)
                    ),
                ]
            ),
        };

        var hospital = new Hospital(
            "hospital-a",
            "Hospital A",
            [10, 10],
            rooms,
            doctors,
            doctors[0].Id
        );

        return Results.Ok(hospital);
    }
);

app.MapCarter();
app.MapHub<HospitalHub>("/api/hubs/hospital/{id}");

app.Run();
