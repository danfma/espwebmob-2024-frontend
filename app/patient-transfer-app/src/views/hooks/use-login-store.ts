import {createLoginStore} from "@app/stores";
import {useMemo} from "react";

import {useDomainServices} from "./use-domain-services.ts";
import {useHospitalOverviewStore} from "./use-hospital-overview-context.ts";
import {useUserStore} from "./use-store-context.ts";

export function useLoginStore () {
  const {authService} = useDomainServices();
  const userStore = useUserStore();
  const hospitalOverviewStore = useHospitalOverviewStore();

  return useMemo(
    () => createLoginStore(authService, userStore, hospitalOverviewStore),
    [authService, userStore, hospitalOverviewStore]
  );
}
