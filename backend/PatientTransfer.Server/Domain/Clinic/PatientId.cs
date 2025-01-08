namespace PatientTransfer.Server.Domain.Clinic;

public readonly record struct PatientId(Ulid Value) : IEntityId<PatientId, Ulid>
{
    public static PatientId None => default;

    public static PatientId New() => Create(Ulid.NewUlid());

    public static PatientId Create(Ulid value) => new(value);
}
