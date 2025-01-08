using Carter;
using Microsoft.AspNetCore.Mvc;
using PatientTransfer.Server.Data;
using PatientTransfer.Server.Services.Auth;

namespace PatientTransfer.Server.Routes;

public sealed class AuthModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        app.MapPost("/api/auth", Authenticate)
            .Produces<AuthenticationData>()
            .ProducesValidationProblem(StatusCodes.Status401Unauthorized);
    }

    private IResult Authenticate(AuthByPasswordData data, [FromServices] AuthService authService)
    {
        var authentication = authService.AuthenticateAsync(data);

        return authentication is null ? Results.Unauthorized() : Results.Ok(authentication);
    }
}
