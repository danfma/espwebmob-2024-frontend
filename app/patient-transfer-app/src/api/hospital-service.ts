import {Hospital} from "../domain/hospital.ts";

export interface HospitalService {
  setAuthorizationToken(token: string): void;
  load(): Promise<Hospital>;
}
