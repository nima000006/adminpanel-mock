import { BPMS_API_RESPONSE } from "../../../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type EnvelopeReviewStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export type UserInfoType = {
  respondentOrganization: string;
  inquirerOrganization: string;
  inquirerPost: string;
  inquirerLastName: string;
  respondentLastName: string;
  inquirerDateRequest: string;
  inquirerFirstName: string;
  id: number;
  respondentFirstName: string;
  inquirerNumber: string;
  respondentPost: string;
};
//! API
export type GetSubmitterDetailLetterInformationResponse = BPMS_API_RESPONSE<
  {
    respondentOrganization: string;
    inquirerOrganization: string;
    inquirerPost: string;
    inquirerLastName: string;
    respondentLastName: string;
    inquirerDateRequest: string;
    inquirerFirstName: string;
    id: number;
    respondentFirstName: string;
    inquirerNumber: string;
    respondentPost: string;
  }[]
>;
export type GetSubmitterDetailTableInformationResponse = BPMS_API_RESPONSE<
  {
    RequestInquiryId: number;
    AssociationFinalRulings_AssociationRulings_title: string;
    AssociationFinalRulings_numberVote: string;
    AssociationFinalRulings_AssociationViolationStudent_AssociationInfractions_title: string;
    AssociationFinalRulings_AssociationViolationStudent_createDate: string;
    AssociationFinalRulings_dateVote: string;
    id: number;
  }[]
>;
