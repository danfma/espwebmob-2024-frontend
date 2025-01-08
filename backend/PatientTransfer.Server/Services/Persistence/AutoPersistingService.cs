namespace PatientTransfer.Server.Services.Persistence;

public sealed class AutoPersistingService(EntityStore store) : IHostedService
{
    private const string FileName = "entity-store.json";

    public async Task StartAsync(CancellationToken cancellationToken)
    {
        await store.Load(FileName, cancellationToken);
    }

    public async Task StopAsync(CancellationToken cancellationToken)
    {
        await store.Persist(FileName, cancellationToken);
    }
}
