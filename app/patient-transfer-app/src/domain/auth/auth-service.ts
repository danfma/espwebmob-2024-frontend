import {User} from "./auth.ts";

export interface AuthService {
  // eslint-disable-next-line no-unused-vars
  authorize(username: string, password: string): Promise<User>;
}

export function createClientOnlyAuthService (): AuthService {
  return {
    async authorize (username: string, password: string) {
      if (username === "doctor-a" && password === "password") {
        return {
          kind: "user",
          personId: "doctor-a",
          hospitalId: "hospital-a",
          accessToken: "my-token"
        };
      }

      return {
        kind: "guest"
      };
    }
  };
}
