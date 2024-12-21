import {computed, signal} from "@preact/signals-react";
import {createGuestUser, User} from "@domain/auth";

export function createUserStore () {
  const user = signal<User>(createGuestUser());
  const isAuthenticated = computed(() => user.value.kind == "user");

  return {
    user,
    isAuthenticated
  };
}

export const useUserStore = createUserStore;

export type UserStore = ReturnType<typeof createUserStore>;
