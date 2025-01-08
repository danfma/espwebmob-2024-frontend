using PatientTransfer.Server.Domain.Accounts;
using PatientTransfer.Server.Services.Persistence;

namespace PatientTransfer.Server.Services.Auth;

public class UserService(EntityStore store)
{
    public UserAccount? FindByUsernameAndPasswordAsync(string username, string password)
    {
        return store.UserAccounts.FirstOrDefault(x =>
            x.Username == username && x.Password == password
        );
    }
}
