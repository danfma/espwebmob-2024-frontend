namespace PatientTransfer.Server.Data;

public sealed record HospitalData(
    string Id,
    string Name,
    GeoJsonPoint Location,
    RoomData[] Rooms,
    DoctorData[] Doctors,
    string RegulatorId
);
