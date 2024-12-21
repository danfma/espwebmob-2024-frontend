import {Hospital} from "./hospital.ts";
import {HospitalEvent} from "./hospital-events.ts";
import {Observable} from "rxjs";

export interface HospitalService {
  setAuthorizationToken(token: string): void;
  load(): Promise<Hospital>;
  listen(): Observable<HospitalEvent>;
}

