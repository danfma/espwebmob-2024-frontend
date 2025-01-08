namespace PatientTransfer.Server.Domain.Clinic;

public abstract class Entity<TId> : IEntity<TId>
    where TId : IEntityId<TId>
{
    public TId Id { get; init; } = TId.None;

    public override bool Equals(object? obj)
    {
        if (obj is not Entity<TId> other || GetType() != other.GetType())
            return false;

        return ReferenceEquals(this, other) || Equals(Id, other.Id);
    }

    public override int GetHashCode() => Id.GetHashCode();
}
