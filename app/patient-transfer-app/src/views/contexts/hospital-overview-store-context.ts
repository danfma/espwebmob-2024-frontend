import {HospitalOverviewStore} from "@app/stores";
import {createContext} from "react";

export const HospitalOverviewContext = createContext<HospitalOverviewStore | null>(null);

export const HospitalOverviewProvider = HospitalOverviewContext.Provider;

