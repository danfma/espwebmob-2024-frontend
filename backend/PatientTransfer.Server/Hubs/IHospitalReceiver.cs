using PatientTransfer.Server.Data;

namespace PatientTransfer.Server.Hubs;

public interface IHospitalReceiver
{
    Task HospitalLoaded(HospitalData data);
}
