using NetTopologySuite.Geometries;
using PatientTransfer.Server.Domain.Clinic;
using Riok.Mapperly.Abstractions;

namespace PatientTransfer.Server.Data;

[Mapper]
public static partial class DataMapper
{
    [UserMapping]
    public static GeoJsonPoint ExportAsData(this Point point) => new([point.X, point.Y]);

    [UserMapping]
    public static string ExportAsData(DoctorId doctorId) => doctorId.Value.ToString();

    [UserMapping]
    public static string ExportAsData(HospitalId hospitalId) => hospitalId.Value.ToString();

    [UserMapping]
    public static string ExportAsData(PatientId patientId) => patientId.Value.ToString();

    [UserMapping]
    public static string ExportAsData(RoomId roomId) => roomId.Value;

    [UserMapping]
    public static string ExportAsData(SpecialtyId specialtyId) => specialtyId.Value;

    [UserMapping]
    public static string ExportAsData(PersonId personId) => personId.Value;

    [UserMapping]
    public static string ExportAsData(Crm crm) => crm.Value;

    [MapProperty(nameof(@Hospital.Regulator.Id), nameof(@HospitalData.RegulatorId))]
    public static partial HospitalData ExportAsData(this Hospital hospital);
}
