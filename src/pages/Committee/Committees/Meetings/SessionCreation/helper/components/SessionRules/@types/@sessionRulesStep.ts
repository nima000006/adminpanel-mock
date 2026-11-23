import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "@infra/states/redux/Apis/models/committeeApi.model";

//! GENERAL

//! LAYOUT
export type SessionRulesStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};
//! API
export type GetListOfSessionCreationAccusationsResponse = BPMS_API_RESPONSE<
  {
    nationalCode: string;
    AssociationTblPriiority_title: string;
    primaryProvider: string;
    studentNumber: string;
    studentPhoneNumber: string;
    studentName: string;
    AssociationInfractions_title: string;
    AssociationInfractionType_title: string;
    AssociationPlaintiffType_title: string;
    id: number;
    meeting: number;
    studentFamily: string;
    createDate: string;
    reviewPeriod: string;
    preliminaryProcessing?: boolean | null;
    AssociationSessionProblems_confirmationVerdict?: boolean | null;
  }[]
>;
export type ListOfSessionCreationAccusationsRequest = {
  firstResult: number;
  maxResults: number;
  name?: string;
  family?: string;
  nationalCode?: string;
  studentNumber?: string;
  mobile?: string;
  id?: number;
  meetingId?: number;
  preliminaryTrue?: true;
  preliminaryNull?: true;
};
export type GetListOfSessionCreationAccusationsCountRequest = {
  name?: string;
  family?: string;
  nationalCode?: string;
  studentNumber?: string;
  mobile?: string;
  id?: number;
  meetingId?: number;
};
export type AddNewAgendaResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type AddNewAgendaRequest = BPMS_API_REQUEST<
  string,
  {
    meeting: number | null;
    primaryProvider?: string;
    reviewPeriod?: string;
    id: number;
  }
>;
