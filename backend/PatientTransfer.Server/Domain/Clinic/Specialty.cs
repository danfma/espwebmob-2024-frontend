namespace PatientTransfer.Server.Domain.Clinic;

public sealed record Specialty(string Name) : IEntity<SpecialtyId>
{
    SpecialtyId IEntity<SpecialtyId>.Id => SpecialtyId.Create(Name);
}
