import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

import { AllocationType } from "../../AllocateResidenceStep/@types/@allocateResidenceStep";

export type AdmissionProgramScheduleType =
  "termic" | "monthly" | "daily" | "dailyPackage";

export type AdmissionProgramOption = IdTitle & {
  type: AdmissionProgramScheduleType;
  /** Fixed stay range for termic programs (ISO date strings). */
  stayRange?: [string, string];
  /** Determines allocate-residence UI (bed / unit / building). */
  allocationType?: AllocationType;
};

export type SelectResidenceFormType = {
  residence?: SelectType<IdTitle>;
  branch?: SelectType<IdTitle>;
  admissionProgram?: SelectType<AdmissionProgramOption>;
  stayRange?: [string, string];
};
