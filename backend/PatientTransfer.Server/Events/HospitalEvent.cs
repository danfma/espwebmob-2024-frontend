using PatientTransfer.Server.Data;

namespace PatientTransfer.Server.Events;

public abstract record HospitalEvent(string Kind);

public sealed record RegulatorChangedEvent(string RegulatorId) : HospitalEvent("RegulatorChanged");

public sealed record PatientAllocatedEvent(string RoomId, int Bed, Patient Patient)
    : HospitalEvent("PatientAllocated");
