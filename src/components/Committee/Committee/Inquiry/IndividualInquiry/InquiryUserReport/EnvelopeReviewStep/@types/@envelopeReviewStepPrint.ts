import { User } from "@pages/Committee/History/IndividualInquiry/InquiryUsersList/@types/@inquiryUsersList";
//! GENERAL
//! LAYOUT
export type EnvelopeReviewStepPrintProps = {
  data?: {
    RequestInquiryId: number;
    AssociationFinalRulings_AssociationRulings_title: string;
    AssociationFinalRulings_numberVote: string;
    AssociationFinalRulings_AssociationViolationStudent_AssociationInfractions_title: string;
    AssociationFinalRulings_AssociationViolationStudent_createDate: string;
    AssociationFinalRulings_dateVote: string;
    id: number;
  }[];
  userInfo?: {
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
  studentInformation: User | null;
};

export type TableData = {
  RequestInquiryId: number;
  AssociationFinalRulings_AssociationRulings_title: string;
  AssociationFinalRulings_numberVote: string;
  AssociationFinalRulings_AssociationViolationStudent_AssociationInfractions_title: string;
  AssociationFinalRulings_AssociationViolationStudent_createDate: string;
  AssociationFinalRulings_dateVote: string;
  id: number;
};
//! APIS
