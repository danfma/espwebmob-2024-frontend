/**
 * This is a TypeGen auto-generated file.
 * Any changes made to this file can be lost when this file is regenerated.
 */

import { PersonData } from "./person-data";
import { SpecialtyData } from "./specialty-data";

export interface DoctorData {
  id: string;
  person: PersonData;
  crm: string;
  specialties: SpecialtyData[];
}
