import {Observable, Subject} from "rxjs";

import {Doctor, Hospital, HospitalId} from "./hospital.ts";
import {HospitalEvent} from "./hospital-events.ts";

/* eslint-disable no-unused-vars */
export interface HospitalService {
  setAuthorizationToken(token: string): void;
  load(id: HospitalId): Promise<Hospital>;
  listen(id: HospitalId): Observable<HospitalEvent>;
}

export function createClientOnlyHospitalService (): HospitalService {
  return {
    setAuthorizationToken (token: string) {
      console.log("Setting authorization token", token);
    },

    async load (id: HospitalId) {
      const doctorA: Doctor = {
        id: "doctor-a",
        name: "Doctor A",
        crm: "123456",
        specialty: {
          id: "speciality-a",
          name: "Speciality A"
        },
        kind: "doctor"
      };

      return {
        id: id,
        name: "Hospital A",
        location: [0, 0],
        regulatorId: doctorA.id,
        doctors: [doctorA],
        rooms: [
          {
            id: "room-a",
            beds: [
              {
                patient: {
                  id: "patient-a",
                  name: "Patient A",
                  age: 30,
                  cpf: {
                    value: "123.456.789-00"
                  },
                  responsible: doctorA.id,
                  kind: "patient"
                }
              }
            ]
          },
          {
            id: "room-b",
            beds: [
              {
                patient: null
              }
            ]
          }
        ]
      };
    },

    listen (_: HospitalId) {
      return new Subject<HospitalEvent>();
    }
  };
}
