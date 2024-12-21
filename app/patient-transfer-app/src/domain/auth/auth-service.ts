import {User} from "./auth.ts";

export interface AuthService {
  authorize(username: string, password: string): Promise<User>;
}

