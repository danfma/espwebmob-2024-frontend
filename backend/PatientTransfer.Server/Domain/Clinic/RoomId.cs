namespace PatientTransfer.Server.Domain.Clinic;

public readonly record struct RoomId(string Value) : IEntityId<RoomId, string>
{
    public static RoomId None { get; } = Create(string.Empty);

    public static RoomId New() =>
        throw new NotSupportedException("A room id need to be manually defined");

    public static RoomId Create(string value) => new(value);
}
