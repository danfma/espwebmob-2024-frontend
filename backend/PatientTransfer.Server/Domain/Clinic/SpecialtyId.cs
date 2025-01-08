namespace PatientTransfer.Server.Domain.Clinic;

public readonly record struct SpecialtyId(string Value) : IEntityId<SpecialtyId, string>
{
    public static SpecialtyId None { get; } = Create(string.Empty);

    public static SpecialtyId New() =>
        throw new NotSupportedException("A specialty id need to be manually defined");

    public static SpecialtyId Create(string value) => new(value);
}
