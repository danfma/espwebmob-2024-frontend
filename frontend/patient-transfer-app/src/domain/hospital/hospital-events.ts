import {HospitalHubEvent} from "@app/api";

import {Hospital} from "./hospital.ts";


export function applyEvent (hospital: Hospital, event: HospitalHubEvent) {
  console.log("EVENT RECEIVED", event);

  return hospital;
}
