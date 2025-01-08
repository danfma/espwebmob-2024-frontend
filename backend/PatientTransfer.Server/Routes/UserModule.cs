using Carter;
using Microsoft.AspNetCore.Mvc;
using PatientTransfer.Server.Data;
using PatientTransfer.Server.Domain.Clinic;
using PatientTransfer.Server.Extensions;
using PatientTransfer.Server.Services.Clinic;

namespace PatientTransfer.Server.Routes;

public sealed class UserModule : ICarterModule
{
    public void AddRoutes(IEndpointRouteBuilder app)
    {
        var group = app.MapGroup("/api/user").RequireAuthorization();

        group
            .MapGet("/hospital", GetHospital)
            .Produces<Hospital>()
            .ProducesValidationProblem(StatusCodes.Status401Unauthorized);
    }

    private IResult GetHospital(
        HttpContext httpContext,
        [FromServices] HospitalService hospitalService
    )
    {
        var hospitalId = httpContext
            .User.Claims.FirstOrDefault(x => x.Type == "hospitalId")
            .ParseAsRequired<HospitalId>();

        var hospital = hospitalService.GetById(hospitalId);

        return Results.Ok(hospital.ExportAsData());
    }
}
