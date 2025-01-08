using PatientTransfer.Server.Services.Persistence;

namespace PatientTransfer.Test;

public class EntityStorePersistenceTest
{
    private const string FileName = "entity-store.json";

    [Fact]
    public async Task PersistAndLoad()
    {
        var entityStore = EntityStore.CreateInMemory();

        await entityStore.Persist(FileName, CancellationToken.None);
        await entityStore.Load(FileName, CancellationToken.None);
    }
}
