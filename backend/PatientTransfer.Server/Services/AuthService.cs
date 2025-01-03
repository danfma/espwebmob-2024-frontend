using PatientTransfer.Server.Data;

namespace PatientTransfer.Server.Services;

public class AuthService
{
    public ValueTask<AuthenticatedUser?> AuthenticateAsync(AuthByPassword data)
    {
        if (data.Username != "doctor-a" || data.Password != "password")
            return ValueTask.FromResult<AuthenticatedUser?>(null);

        var user = new AuthenticatedUser("doctor-a", "hospital-a", "jwt-token");

        return ValueTask.FromResult<AuthenticatedUser?>(user);
    }
}
