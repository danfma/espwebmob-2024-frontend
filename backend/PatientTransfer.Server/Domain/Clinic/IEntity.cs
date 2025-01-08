namespace PatientTransfer.Server.Domain.Clinic;

public interface IEntity<out TId>
    where TId : IEntityId<TId>
{
    TId Id { get; }
}
