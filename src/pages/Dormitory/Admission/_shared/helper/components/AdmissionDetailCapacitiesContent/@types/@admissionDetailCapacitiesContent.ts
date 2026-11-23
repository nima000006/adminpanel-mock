import { To } from "react-router";

import {
  AdmissionDetailMockData,
  AdmissionDetailStatus,
} from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

export type AdmissionDetailCapacitiesVariant = "all" | "my";

export type AdmissionDetailCapacitiesContentProps = {
  variant: AdmissionDetailCapacitiesVariant;
  data: AdmissionDetailMockData;
  editTo?: To;
  status?: AdmissionDetailStatus;
};
