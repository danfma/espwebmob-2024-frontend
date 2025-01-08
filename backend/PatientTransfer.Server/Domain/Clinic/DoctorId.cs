namespace PatientTransfer.Server.Domain.Clinic;

public readonly record struct DoctorId(Ulid Value) : IEntityId<DoctorId, Ulid>
{
    public static DoctorId None => default;

    public static DoctorId New() => Create(Ulid.NewUlid());

    public static DoctorId Create(Ulid value) => new(value);

    public static implicit operator string(DoctorId id) => id.Value.ToString();
}
