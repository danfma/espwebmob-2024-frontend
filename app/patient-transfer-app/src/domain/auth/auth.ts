import {HospitalId, PersonId} from "../hospital";

export type Token = string;

export interface Guest {
  readonly kind: "Guest";
}

export interface AuthenticatedUser {
  readonly kind: "User";
  readonly personId: PersonId;
  readonly hospitalId: HospitalId;
  readonly accessToken: Token;
}

export type User = Guest | AuthenticatedUser;

export function createGuestUser (): Guest {
  return {kind: "Guest"};
}

