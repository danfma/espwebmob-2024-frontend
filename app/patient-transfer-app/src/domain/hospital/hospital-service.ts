import {HubConnectionBuilder} from "@microsoft/signalr";
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

export function createHospitalService (url: string = "/api/hospital") {
  let cachedToken: string | null = null;

  return {
    setAuthorizationToken (token: string) {
      cachedToken = token;
    },

    async load (id: HospitalId) {
      const response = await fetch(`${url}/${id}`, {
        method: "GET",
        headers: cachedToken
          ? {
            Authorization: `Bearer ${cachedToken}`
          }
          : {}
      });

      if (response.status !== 200) {
        throw new Error("Failed to load hospital");
      }

      return response.json();
    },

    listen (id: HospitalId) {
      const hub = new HubConnectionBuilder().
        withUrl(`/api/hubs/hospital/${id}`).
        build();

      const hospitalEvents = new Subject<HospitalEvent>();

      hub.on("HospitalEvent", (event: HospitalEvent) => {
        hospitalEvents.next(event);
      });

      return new Observable<HospitalEvent>((observer) => {
        const subscription = hospitalEvents.subscribe(observer);

        hub.start();

        return () => {
          subscription.unsubscribe();
          hub.stop();
        };
      });
    }
  };
}
