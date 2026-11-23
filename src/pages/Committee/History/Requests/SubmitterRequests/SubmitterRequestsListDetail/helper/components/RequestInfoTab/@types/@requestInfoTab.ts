import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT

//! API
export type GetSubmitterRequestInformationDetailResponse = BPMS_API_RESPONSE<{
  dateRegistration: string;
  typeInformation: string;
  reasonRequest: string;
  AssociationInquiryRequestStatus: {
    tenant_id: null;
    id: number;
    title: string;
  };
  descRequest: string;
  id: number;
}>;
export type GetSubmitterRequestInformationDetailRequest = {
  _data_: {
    id: string;
  };
};
