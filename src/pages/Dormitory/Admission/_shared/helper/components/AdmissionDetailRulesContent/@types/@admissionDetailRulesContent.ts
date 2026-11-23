import { To } from "react-router";

import { AdmissionDetailStatus } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

export type AdmissionDetailRulesVariant = "all" | "my" | "active";

export type AdmissionDetailRulesContentProps = {
  variant: AdmissionDetailRulesVariant;
  editTo?: To;
  status?: AdmissionDetailStatus;
};
