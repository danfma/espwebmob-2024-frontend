namespace PatientTransfer.Server.Data;

public sealed record Patient(string Id, string Name, int Age, string Cpf, string Responsible)
    : Person(Id, PersonType.Patient);
