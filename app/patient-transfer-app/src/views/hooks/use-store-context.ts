import {UserStore} from "@app/stores";
import {failWith} from "@app/utils";
import {UseStoreContext} from "@app/views/contexts";
import {useContext} from "react";

export function useUserStore (): UserStore {
  return useContext(UseStoreContext) ?? failWith("UserStoreProvider not found");
}

