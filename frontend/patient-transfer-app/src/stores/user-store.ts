import {createGuestUser, User} from "@app/domain/auth";
import {computed, signal} from "@preact/signals-react";

export function createUserStore () {
  const user = signal<User>(createGuestUser());
  const isAuthenticated = computed(() => user.value.kind == "User");

  const setUser = (value: User) => {
    user.value = value;
  };

  return {
    user,
    isAuthenticated,
    setUser
  };
}

export type UserStore = ReturnType<typeof createUserStore>;


