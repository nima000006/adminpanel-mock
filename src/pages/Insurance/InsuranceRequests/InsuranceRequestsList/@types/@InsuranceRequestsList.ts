import { GENERAL_RESPONSE } from "../../../../../infrastructure/models/modules/GeneralTypes/GeneralTypes";

//! LAYOUT

export type InsuranceRequestTableProps = {
  type: number;
};
//! APIS
export type insuredInsuranceInformationForAdminResponseDtoList = {
  id: number;
  invoiceId: string;
  requestDate: string;
  insuranceName: string;
  requestNumber: null;
  branchCode: string;
  studentNumber: null;
  nationalCode: string;
  gender: string;
  firstName: string;
  lastName: string;
  price: string;
  insuranceType: string;
  paymentType: number;
  insuranceStatus: number;
  primary: boolean;
};
export type getInsuranceRequestsListWithStatusResponse = GENERAL_RESPONSE<{
  totalElement: number;
  totalPage: number;
  insuredInsuranceInformationForAdminResponseDtoList: insuredInsuranceInformationForAdminResponseDtoList[];
}>;
export type getInsuranceRequestsListWithStatusRequest = {
  insuranceRequestStatus: number;
  pageNumber: number;
  pageSize: number;
};
export type getAllInsuranceRequestsListRequest = {
  pageNumber: number;
  pageSize: number;
};
//! GENERAL
