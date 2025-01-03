using Carter;

namespace PatientTransfer.Server.Routes;

public sealed class HomeModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapGet("/", () => "Server is running!!");
    }
}