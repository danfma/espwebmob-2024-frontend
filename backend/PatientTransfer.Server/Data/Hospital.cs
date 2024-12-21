namespace PatientTransfer.Server.Data;

public sealed record Hospital(
    string Id,
    string Name,
    double[] Location,
    Room[] Rooms,
    Doctor[] Doctors,
    string RegulatorId
);
