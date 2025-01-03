import {HospitalOverviewStore} from "@app/stores";
import {failWith} from "@app/utils";
import {HospitalOverviewContext} from "@app/views/contexts";
import {useContext} from "react";

export function useHospitalOverviewStore (): HospitalOverviewStore {
  return useContext(HospitalOverviewContext) ?? failWith("HospitalOverviewStoreProvider not found");
}

