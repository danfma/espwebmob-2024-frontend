using PatientTransfer.Server.Data;

namespace PatientTransfer.Server.Hubs;

public interface IHospitalReceiver
{
    void HospitalLoaded(HospitalData data);
}
