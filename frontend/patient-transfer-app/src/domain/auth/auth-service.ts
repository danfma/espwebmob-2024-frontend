import {AccessTokenPayload, PatientTransferClient} from "@app/api";
import * as jose from "jose";

import {User} from "./auth.ts";

export interface AuthService {

  authorize(username: string, password: string): Promise<User>;
}

export function createAuthService (client: PatientTransferClient): AuthService {
  const decodePayload = (accessToken: string): AccessTokenPayload => {
    return jose.decodeJwt(accessToken) as AccessTokenPayload;
  };

  return {
    async authorize (username: string, password: string) {
      const authentication = await client.auth.authenticate(username, password);

      // TODO not the best way to check for unauthorized
      if (!authentication) {
        return {
          kind: "Guest"
        };
      }

      const {accessToken} = authentication;
      const payload = decodePayload(accessToken);

      return {
        kind: "User",
        personId: payload.nameid,
        hospitalId: payload.hospitalId,
        doctorId: payload.doctorId,
        accessToken
      };
    }
  };
}
