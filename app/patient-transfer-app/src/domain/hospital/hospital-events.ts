import {DoctorId, Hospital, Patient, RoomId} from "./hospital.ts";

export interface RegulatorChanged {
  readonly kind: "RegulatorChanged";
  readonly regulatorId: DoctorId;
}

export interface PatientAllocated {
  readonly kind: "PatientAllocated";
  readonly roomId: RoomId;
  readonly bed: number;
  readonly patient: Patient;
}

export type HospitalEvent = RegulatorChanged | PatientAllocated;

export function applyEvent (hospital: Hospital, event: HospitalEvent) {
  switch (event.kind) {
    case "RegulatorChanged":
      hospital = applyRegulatorChangedEvent(hospital, event);
      break;

    case "PatientAllocated":
      hospital = applyPatientAllocated(hospital, event);
      break;
  }

  return hospital;
}

function applyRegulatorChangedEvent (hospital: Hospital, event: RegulatorChanged) {
  return {
    ...hospital,
    regulatorId: event.regulatorId
  };
}

function applyPatientAllocated (hospital: Hospital, event: PatientAllocated) {
  return {
    ...hospital,
    rooms: hospital.rooms.map((room) => {
      if (room.id === event.roomId) {
        return {
          ...room,
          beds: room.beds.map((bed, index) => {
            if (index === event.bed) {
              return {
                ...bed,
                patient: event.patient
              };
            }
            return bed;
          })
        };
      }
      return room;
    })
  };
}
