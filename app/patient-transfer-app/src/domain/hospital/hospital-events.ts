import {DoctorId, Patient, RoomId} from "./hospital.ts";

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
