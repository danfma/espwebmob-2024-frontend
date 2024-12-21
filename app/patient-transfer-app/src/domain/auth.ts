import {PersonId} from "./hospital.ts";

export type Token = string;

export interface Guest {
  readonly kind: "guest";
}

export interface AuthenticatedUser {
  readonly kind: "user";
  readonly personId: PersonId;
  readonly accessToken: Token;
}

export type User = Guest | AuthenticatedUser;
