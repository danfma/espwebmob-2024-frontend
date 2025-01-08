namespace PatientTransfer.Server.Domain.Clinic;

public readonly record struct HospitalId(Ulid Value) : IEntityId<HospitalId, Ulid>
{
    public static HospitalId None => default;

    public static HospitalId New() => Create(Ulid.NewUlid());

    public static HospitalId Create(Ulid value) => new(value);

    public static implicit operator string(HospitalId id) => id.Value.ToString();
}
