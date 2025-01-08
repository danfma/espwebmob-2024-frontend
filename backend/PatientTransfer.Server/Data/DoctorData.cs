namespace PatientTransfer.Server.Data;

public sealed record DoctorData(
    string Id,
    PersonData Person,
    string Crm,
    SpecialtyData[] Specialties
);
