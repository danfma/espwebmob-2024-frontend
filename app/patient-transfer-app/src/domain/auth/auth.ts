import {HospitalId, PersonId} from "../hospital";

export type Token = string;

export interface Guest {
  readonly kind: "guest";
}

export interface AuthenticatedUser {
  readonly kind: "user";
  readonly personId: PersonId;
  readonly hospitalId: HospitalId;
  readonly accessToken: Token;
}

export type User = Guest | AuthenticatedUser;

export function createGuestUser (): Guest {
  return {kind: "guest"};
}

