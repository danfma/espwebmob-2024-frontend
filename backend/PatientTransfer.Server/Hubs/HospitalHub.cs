using System.Security.Claims;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using PatientTransfer.Server.Data;
using PatientTransfer.Server.Domain.Accounts;
using PatientTransfer.Server.Domain.Clinic;
using PatientTransfer.Server.Extensions;
using PatientTransfer.Server.Services.Persistence;

namespace PatientTransfer.Server.Hubs;

[Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
public class HospitalHub(EntityStore store, ILogger<HospitalHub> logger) : Hub<IHospitalReceiver>
{
    private Hospital Hospital
    {
        get =>
            Context.Items[nameof(Hospital)] as Hospital
            ?? throw new InvalidOperationException("No hospital in context.");
        set => Context.Items[nameof(Hospital)] = value;
    }

    public Doctor? Doctor
    {
        get => Context.Items[nameof(Doctor)] as Doctor;
        set => Context.Items[nameof(Doctor)] = value;
    }

    public UserAccount UserAccount
    {
        get =>
            Context.Items[nameof(UserAccount)] as UserAccount
            ?? throw new InvalidOperationException("No user account in context.");
        set => Context.Items[nameof(UserAccount)] = value;
    }

    public override async Task OnConnectedAsync()
    {
        var user = Context.User;

        if (user is null)
        {
            logger.LogWarning("Aborting connection due to null user.");

            Context.Abort();
            await base.OnConnectedAsync();
            return;
        }

        var personId = user
            .Claims.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)
            .ParseAsRequired<PersonId>();

        var hospitalId = user
            .Claims.FirstOrDefault(x => x.Type == "hospitalId")
            .ParseAsRequired<HospitalId>();

        var doctorId = user.Claims.FirstOrDefault(x => x.Type == "doctorId").ParseAs<DoctorId>();

        Hospital = store.Hospitals.First(x => x.Id == hospitalId);
        Doctor = store.Doctors.FirstOrDefault(x => x.Id == doctorId);
        UserAccount = store.UserAccounts.First(x => x.Person.Id == personId);

        logger.LogInformation(
            "{Username} connected to {HospitalName}",
            UserAccount.Username,
            Hospital.Name
        );

        await base.OnConnectedAsync();
    }

    public async Task Watch()
    {
        logger.LogInformation("Received watch request from {Username}", UserAccount.Username);

        await Clients.Caller.HospitalLoaded(Hospital.ExportAsData());

        logger.LogInformation("Response data sent...");
    }
}
