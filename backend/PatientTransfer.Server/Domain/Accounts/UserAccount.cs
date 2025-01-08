using PatientTransfer.Server.Domain.Clinic;

namespace PatientTransfer.Server.Domain.Accounts;

public sealed class UserAccount(Hospital hospital, Person person, string username, string password)
{
    public Hospital Hospital { get; } = hospital;
    public Person Person { get; } = person;
    public string Username { get; } = username;
    public string Password { get; } = password;
}
