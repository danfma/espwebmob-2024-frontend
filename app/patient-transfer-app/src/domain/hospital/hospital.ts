
export type HospitalId = string;

export interface Hospital {
  readonly id: HospitalId;
  readonly name: string;
  readonly location: [number, number];
  readonly rooms: Room[];
  readonly doctors: Doctor[];
  readonly regulatorId: DoctorId;
}

export type PersonId = string;
export type PersonType = "doctor" | "regulator" | "patient";

export interface Person {
  readonly id: PersonId;
  readonly kind: PersonType;
}

export type DoctorId = PersonId;
export type Crm = string;

export interface Doctor extends Person {
  readonly id: DoctorId;
  readonly name: string;
  readonly crm: Crm;
  readonly specialty: Speciality;
  readonly kind: "doctor" | "regulator";
}

export type SpecialityId = string;

export interface Speciality {
  readonly id: SpecialityId;
  readonly name: string;
}

export type RoomId = string;

export interface Room {
  readonly id: RoomId;
  readonly beds: Bed[];
}

export interface Bed {
  readonly patient: Patient | null;
}

export interface Patient extends Person {
  readonly name: string;
  readonly age: number;
  readonly cpf: Cpf;
  readonly responsible: DoctorId;
  readonly kind: "patient";
}

export interface Cpf {
  readonly value: string;
}
