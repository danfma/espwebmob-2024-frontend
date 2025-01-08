using PatientTransfer.Server.Data;
using TypeGen.Core.SpecGeneration;

namespace GenServerContracts;

public class DataSpec : GenerationSpec
{
    public DataSpec()
    {
        AddInterface<AuthenticationData>();
        AddInterface<AuthByPasswordData>();
        AddInterface<BedData>();
        AddInterface<PatientData>();
        AddInterface<DoctorData>();
        AddInterface<HospitalData>();
        AddInterface<PersonData>();
        AddInterface<RoomData>();
        AddInterface<SpecialtyData>();
        AddInterface<GeoJsonPoint>();
    }
}
