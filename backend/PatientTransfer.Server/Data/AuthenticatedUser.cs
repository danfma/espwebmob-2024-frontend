namespace PatientTransfer.Server.Data;

public sealed record AuthenticatedUser(
    string PersonId,
    string HospitalId,
    string AccessToken
) : User;