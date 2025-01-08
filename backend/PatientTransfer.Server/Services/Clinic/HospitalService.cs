using PatientTransfer.Server.Domain.Clinic;
using PatientTransfer.Server.Services.Persistence;

namespace PatientTransfer.Server.Services.Clinic;

public sealed class HospitalService(EntityStore store)
{
    public Hospital GetById(HospitalId hospitalId)
    {
        return store.Hospitals.First(x => x.Id == hospitalId);
    }
}
