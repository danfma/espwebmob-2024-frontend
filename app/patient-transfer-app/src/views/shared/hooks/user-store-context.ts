import {createContext, useContext} from "react";
import {UserStore} from "@stores/user-store.ts";

export const UserStoreContext = createContext<UserStore | null>(null);

export const UserStoreProvider = UserStoreContext.Provider;

export function useUserStore (): UserStore {
  const userStore = useContext(UserStoreContext);

  if (!userStore) {
    throw new Error("UserStoreContext not found");
  }

  return userStore;
}
