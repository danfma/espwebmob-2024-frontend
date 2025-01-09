import {HospitalHubEvent, PatientTransferClient} from "@app/api";
import {Observable} from "rxjs";

import {Hospital, HospitalConverter} from "./hospital.ts";


export interface HospitalService {
  setAuthorizationToken(token: string): void;
  load(): Promise<Hospital>;
  listen(): Observable<HospitalHubEvent>;
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
      return client.hubs.hospital();
    }
  };
}
