import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "@infra/states/redux/Apis/models/committeeApi.model";
//! GENERAL

//! LAYOUT
export type AccusationAndRequestStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};

export type FormData = {
  description: string;
  familyName: string;
  name: string;
  nationalCode: string;
  reason: { code: number };
  studentNumber: string;
  requestType: { code: number };
};
//! API
export type GetSubmitterAddAccusationRequestRequest = {
  _data_: {
    id: string;
  };
};
export type GetSubmitterAddAccusationRequestResponse = BPMS_API_RESPONSE<{
  AssociationTypeInformation: {
    id: number;
    title: string;
  };
  AssociationReasoneRequest: {
    id: number;
    typeInformationId: number;
    title: string;
  };
  descRequest: string;
  familyOffender: string;
  nameOffender: string;
  studentNumberOffender: string;
  nationalCodeOffender: string;
  id: number;
}>;
export type GetSubmitterAddTypeInformationResponse = BPMS_API_RESPONSE<
  {
    title: string;
    id: number;
  }[]
>;
export type GetSubmitterAddReasonRequestResponse = BPMS_API_RESPONSE<
  {
    title: string;
    typeInformationId: number;
    id: number;
  }[]
>;
export type SendSubmitterAddAccusationRequestRequest = BPMS_API_REQUEST<
  string,
  {
    descRequest: string;
    familyOffender: string;
    id: number;
    nameOffender: string;
    nationalCodeOffender: string;
    reasonRequest: number;
    studentNumberOffender: string;
    typeInformation: number;
  }
>;
export type SendSubmitterAddAccusationRequestResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
