namespace PatientTransfer.Server.Domain.Clinic;

public readonly record struct PersonId(Cpf Value) : IEntityId<PersonId, Cpf>
{
    public static PersonId None { get; } = Create(default);

    public static PersonId New() => Create(Cpf.Random());

    public static PersonId Create(Cpf value) => new(value);

    public static implicit operator string(PersonId id) => id.Value;
}
