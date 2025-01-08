namespace PatientTransfer.Server.Domain.Clinic;

public sealed class Person : Entity<PersonId>
{
    public Person(string name, Cpf cpf)
    {
        Name = name;
        Cpf = cpf;
        Id = PersonId.Create(cpf);
    }

    public string Name { get; }
    public Cpf Cpf { get; }
}
