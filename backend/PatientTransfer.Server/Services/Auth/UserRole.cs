namespace PatientTransfer.Server.Services.Auth;

public readonly record struct UserRole(string Name)
{
    public static readonly UserRole Admin = new(nameof(Admin));
    public static readonly UserRole Doctor = new(nameof(Doctor));
    public static readonly UserRole Regulator = new(nameof(Regulator));

    public static implicit operator string(UserRole role) => role.Name;
}
