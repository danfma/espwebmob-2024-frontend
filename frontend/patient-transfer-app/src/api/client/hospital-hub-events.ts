import {HospitalData} from "../contracts";

export type Connected = {
  readonly type: "Connected";
};

export type Reconnecting = {
  readonly type: "Reconnecting";
};

export type HospitalLoaded = {
  readonly type: "HospitalLoaded";
  readonly hospital: HospitalData;
};

export type HospitalHubEvent =
  | Connected
  | Reconnecting
  | HospitalLoaded;
