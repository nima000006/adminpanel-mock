import { To } from "react-router";

import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { AdmissionDetailStatus } from "@pages/Dormitory/Admission/_shared/@types/@admissionDetail";

export type AdmissionDetailProgramInfoVariant = "all" | "my";

export type AdmissionDetailProgramInfoContentProps = {
  variant: AdmissionDetailProgramInfoVariant;
  editTo?: To;
  status?: AdmissionDetailStatus;
};

//! APIs
export type GetAllAdmissionDetailProgramInfoRequest = string;

export type GetMyAdmissionDetailProgramInfoRequest = string;

export type GetAllAdmissionDetailProgramInfoResponse = {
  uuid: string;
  title: string;
  businessId: number;
  businessTitle: string;
  branchId: number;
  branchTitle: string;
  accommodationUuid: string;
  accommodationTitle: string;
  managementType: IdTitleName;
  saleUnitType: IdTitleName;
  visible: boolean;
};

export type GetMyAdmissionDetailProgramInfoResponse =
  GetAllAdmissionDetailProgramInfoResponse;
