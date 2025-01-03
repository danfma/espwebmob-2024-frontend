using Carter;
using PatientTransfer.Server.Data;
using PatientTransfer.Server.Services;

namespace PatientTransfer.Server.Routes;

public sealed class AuthModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost(
            "/api/auth",
            async (AuthByPassword data, AuthService authService) =>
            {
                var user = await authService.AuthenticateAsync(data);

                return user is null ? Results.Unauthorized() : Results.Ok(user);
            }
        );
    }
}
