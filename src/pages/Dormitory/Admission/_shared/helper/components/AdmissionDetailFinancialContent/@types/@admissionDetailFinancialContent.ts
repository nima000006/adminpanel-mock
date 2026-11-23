import { To } from "react-router";

import {
  AdmissionDetailMockData,
  AdmissionDetailStatus,
} from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

export type AdmissionDetailFinancialVariant = "all" | "my" | "active";

export type AdmissionDetailFinancialContentProps = {
  variant: AdmissionDetailFinancialVariant;
  data: AdmissionDetailMockData;
  editTo?: To;
  status?: AdmissionDetailStatus;
};
