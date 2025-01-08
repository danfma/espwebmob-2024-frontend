import {HospitalData, PersonData} from "@app/api";

export type HospitalId = string;

export type Point = {
  type: "Point";
  coordinates: [number, number];
};

export interface Hospital {
  readonly id: HospitalId;
  readonly name: string;
  readonly location: Point;
  readonly rooms: Room[];
  readonly doctors: Doctor[];
  readonly regulatorId: DoctorId;
}

export type PersonId = string;
export type PersonType = "doctor" | "regulator" | "patient";

export interface Person {
  readonly id: PersonId;
  readonly name: string;
  readonly cpf: string;
}

export type DoctorId = PersonId;
export type Crm = string;

export interface Doctor {
  readonly id: DoctorId;
  readonly person: Person;
  readonly crm: Crm;
  readonly specialties: Speciality[];
}

export interface Speciality {
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

export type PatientId = string;

export interface Patient {
  readonly id: PatientId;
  readonly person: PersonData;
}

export interface Cpf {
  readonly value: string;
}

export function createEmptyHospital (): Hospital {
  return {
    id: "",
    name: "None",
    location: {
      type: "Point",
      coordinates: [0, 0]
    },
    rooms: [],
    doctors: [],
    regulatorId: ""
  };
}

export namespace HospitalConverter {
  export function fromData (data: HospitalData): Hospital {
    return {
      ...data,
      location: data.location as Point
    };
  }
}
