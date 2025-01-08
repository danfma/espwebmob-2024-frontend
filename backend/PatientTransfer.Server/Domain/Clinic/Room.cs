using System.Collections.Immutable;

namespace PatientTransfer.Server.Domain.Clinic;

public class Room : Entity<RoomId>
{
    private readonly Bed[] _beds = GenerateBedsRandomly();

    public ImmutableArray<Bed> Beds => [.. _beds];

    private static Bed[] GenerateBedsRandomly()
    {
        return Enumerable.Range(2, 4).Select(_ => new Bed()).ToArray();
    }
}
