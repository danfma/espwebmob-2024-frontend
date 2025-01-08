/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { GeoJsonPoint } from "./geo-json-point";
import { RoomData } from "./room-data";
import { DoctorData } from "./doctor-data";

export interface HospitalData {
  id: string;
  name: string;
  location: GeoJsonPoint;
  rooms: RoomData[];
  doctors: DoctorData[];
  regulatorId: string;
}
