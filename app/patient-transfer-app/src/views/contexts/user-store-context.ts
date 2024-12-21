import {UserStore} from "@app/stores";
import {createContext} from "react";

export const UseStoreContext = createContext<UserStore | null>(null);

export const UserStoreProvider = UseStoreContext.Provider;
