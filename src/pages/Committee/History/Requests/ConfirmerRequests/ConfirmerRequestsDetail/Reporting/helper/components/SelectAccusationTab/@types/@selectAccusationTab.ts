import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "@infra/states/redux/Apis/models/committeeApi.model";
//! GENERAL

//! LAYOUT
export type SelectAccusationTabProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};
//! API
export type GetViolationsInquirySelectedListResponse = BPMS_API_RESPONSE<
  {
    FixedFinesId: number;
    RequestInquiryId: number;
    id: number;
  }[]
>;
export type SendViolationsInquirySelectedListResponse = BPMS_API_RESPONSE<{ id: number }>;
export type SendViolationsInquirySelectedListRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationRequestInquiry: {
      AssociationFixedFines: {
        id: number;
      };
      FixedFinesId: number;
      RequestInquiryId: number;
    }[];
    status: null;
  }
>;
