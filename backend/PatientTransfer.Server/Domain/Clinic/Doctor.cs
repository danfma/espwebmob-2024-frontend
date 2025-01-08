namespace PatientTransfer.Server.Domain.Clinic;

public sealed class Doctor(Person person, Crm crm, IEnumerable<Specialty> specialties)
    : Entity<DoctorId>
{
    public Person Person { get; } = person;
    public Crm Crm { get; } = crm;
    public HashSet<Specialty> Specialties { get; } = [.. specialties];
}
