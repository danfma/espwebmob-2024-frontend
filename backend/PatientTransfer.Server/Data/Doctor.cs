namespace PatientTransfer.Server.Data;

public sealed record Doctor(
    string Id,
    string Name,
    string Crm,
    Speciality Specialty,
    PersonType Kind
) : Person(Id, Kind);
