import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";
//! GENERAL
//! LAYOUT
export type EnvelopeInformationStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};
export type FormDataType = {
  inquirerName: string;
  inquirerFamily: string;
  inquirerRole: string;
  inquirerOrganization: string;
  inquirerNumber: string;
  dateOccurrence: string;
  signerName: string;
  signerFamily: string;
  signerRole: string;
  signerOrganization: string;
};
//! API
export type GetLetterInformationResponse = BPMS_API_RESPONSE<
  {
    inquirerFirstName: string;
    inquirerPost: string;
    inquirerNumber: string;
    inquirerLastName: string;
    inquirerOrganization: string;
    inquirerDateRequest: string;
    signatoryFirstName: string;
    signatoryPost: string;
    signatoryLastName: string;
    signatoryOrganization: string;
    id: number;
  }[]
>;
export type SendLetterInformationRequest = BPMS_API_REQUEST<
  string,
  {
    inquirerFirstName: string;
    inquirerPost: string;
    inquirerNumber: string;
    inquirerLastName: string;
    inquirerOrganization: string;
    inquirerDateRequest: string;
    signatoryFirstName: string;
    signatoryPost: string;
    signatoryLastName: string;
    signatoryOrganization: string;
    id: number | null;
  }
>;
export type SendLetterInformationResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
