import {failWith} from "@app/utils";
import {DomainServicesContext} from "@app/views/contexts";
import {useContext} from "react";


export function useDomainServices () {
  return useContext(DomainServicesContext) ?? failWith("DomainServicesContext not found");
}
