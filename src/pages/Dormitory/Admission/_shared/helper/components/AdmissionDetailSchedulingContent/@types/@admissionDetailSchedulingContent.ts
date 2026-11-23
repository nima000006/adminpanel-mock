import { To } from "react-router";

import {
  AdmissionDetailMockData,
  AdmissionDetailStatus,
} from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

export type AdmissionDetailSchedulingVariant = "all" | "my" | "active";

export type AdmissionDetailSchedulingContentProps = {
  variant: AdmissionDetailSchedulingVariant;
  data: AdmissionDetailMockData;
  editTo?: To;
  status?: AdmissionDetailStatus;
};
