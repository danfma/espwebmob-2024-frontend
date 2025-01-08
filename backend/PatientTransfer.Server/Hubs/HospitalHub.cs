using System.Security.Claims;
using Microsoft.AspNetCore.SignalR;
using PatientTransfer.Server.Data;
using PatientTransfer.Server.Domain.Accounts;
using PatientTransfer.Server.Domain.Clinic;
using PatientTransfer.Server.Extensions;
using PatientTransfer.Server.Services.Persistence;

namespace PatientTransfer.Server.Hubs;

public class HospitalHub(EntityStore store) : Hub<IHospitalReceiver>
{
    private Hospital Hospital
    {
        get =>
            Context.Items["hospital"] as Hospital
            ?? throw new InvalidOperationException("No hospital in context.");
        set => Context.Items["hospital"] = value;
    }

    public Doctor? Doctor
    {
        get => Context.Items["doctor"] as Doctor;
        set => Context.Items["doctor"] = value;
    }

    public UserAccount UserAccount
    {
        get =>
            Context.Items["userAccount"] as UserAccount
            ?? throw new InvalidOperationException("No user account in context.");
        set => Context.Items["userAccount"] = value;
    }

    public override Task OnConnectedAsync()
    {
        var user = Context.User;

        if (user is null)
        {
            Context.Abort();
            return Task.CompletedTask;
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

        Clients.Caller.HospitalLoaded(Hospital.ExportAsData());

        return Task.CompletedTask;
    }
}
