namespace PatientTransfer.Server.Domain.Clinic;

public sealed class Patient(Person person) : Entity<PatientId>
{
    public Person Person { get; } = person;
}
