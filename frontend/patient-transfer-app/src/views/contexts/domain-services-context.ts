import type {AuthService} from "@app/domain/auth";
import type {HospitalService} from "@app/domain/hospital";
import {createContext} from "react";

export interface DomainServices {
  authService: AuthService;
  hospitalService: HospitalService;
}

export const DomainServicesContext = createContext<DomainServices | null>(null);

export const DomainServicesProvider = DomainServicesContext.Provider;
