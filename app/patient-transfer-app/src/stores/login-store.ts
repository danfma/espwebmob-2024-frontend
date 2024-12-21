import type {AuthService} from "@app/domain/auth";
import {signal} from "@preact/signals-react";

import {HospitalOverviewStore} from "./hospital-overview-store.ts";
import {UserStore} from "./user-store.ts";

export function createLoginStore (
  authService: AuthService,
  userStore: UserStore,
  hospitalOverviewStore: HospitalOverviewStore
) {
  const username = signal("");
  const password = signal("");

  const setUsername = (value: string) => {
    username.value = value;
  };

  const setPassword = (value: string) => {
    password.value = value;
  };

  const login = async () => {
    const user = await authService.authorize(username.value, password.value);

    if (!(user && user.kind === "User")) {
      // TODO Show an error message
      return;
    }

    await hospitalOverviewStore.loadUserHospital(user);
    userStore.setUser(user);
  };

  const clear = () => {
    username.value = "";
    password.value = "";
  };

  return {
    username,
    password,
    setUsername,
    setPassword,
    login,
    clear
  };
}

export type LoginStore = ReturnType<typeof createLoginStore>;
