import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type SelectAccusationStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};
//! API
export type GetInquiryAccusationListResponse = BPMS_API_RESPONSE<
  {
    dateFilingCharge: string;
    uniStudent: string;
    nationalCode: string;
    dateVote: string;
    gradeStudent: string;
    AssociationViolationStatus_AssociationStatusCategory_title: string;
    AssociationCommitteeType_title: string;
    AssociationInfractions_title: string;
    AssociationPlaintiffType_title: string;
    id: number;
    fieldStudent: string;
    validity: string;
    inquiry: boolean;
    dateLastStatusChange: string;
  }[]
>;
export type EditInquiryAccusationListRequest = BPMS_API_REQUEST<
  string,
  {
    inquiry: boolean;
  }
>;
export type EditInquiryAccusationListResponse = BPMS_API_RESPONSE<null>;
