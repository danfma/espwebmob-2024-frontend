import {PatientTransferClient} from "@app/api";
import {HubConnectionBuilder} from "@microsoft/signalr";
import {Observable, Subject} from "rxjs";

import {Hospital, HospitalConverter} from "./hospital.ts";
import {HospitalEvent} from "./hospital-events.ts";


export interface HospitalService {
  setAuthorizationToken(token: string): void;
  load(): Promise<Hospital>;
  listen(): Observable<HospitalEvent>;
}

export function createHospitalService (client: PatientTransferClient): HospitalService {
  return {
    setAuthorizationToken (token: string) {
      client.auth.setAuthorizationToken(token);
    },

    async load () {
      const data = await client.user.loadHospital();

      return HospitalConverter.fromData(data);
    },

    listen () {
      const hub = new HubConnectionBuilder().
        withUrl("/api/hubs/hospital", {
          headers: {
            Authorization: client.auth.getAuthorizationToken() ?? ""
          }
        }).
        withAutomaticReconnect().
        build();

      const hospitalEvents = new Subject<HospitalEvent>();

      hub.on("HospitalLoaded", (event: HospitalEvent) => {
        console.log(event);
        hospitalEvents.next(event);
      });

      return new Observable<HospitalEvent>((observer) => {
        const subscription = hospitalEvents.subscribe(observer);

        hub.start().catch(console.error);

        return () => {
          subscription.unsubscribe();
          hub.stop().catch(console.error);
        };
      });
    }
  };
}
