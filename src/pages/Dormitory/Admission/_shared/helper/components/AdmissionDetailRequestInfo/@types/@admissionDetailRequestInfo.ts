import { AdmissionDetailMockData } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";
import { AdmissionDetailStatusFlags } from "@pages/Dormitory/Admission/_shared/util";

export type AdmissionDetailRequestInfoVariant = "all" | "my";

export type AdmissionDetailRequestInfoProps = {
  variant: AdmissionDetailRequestInfoVariant;
  data: AdmissionDetailMockData;
  statusFlags: AdmissionDetailStatusFlags;
};
