import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "@infra/states/redux/Apis/models/committeeApi.model";
//! GENERAL

//! LAYOUT
export type PacketInfoStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};
export type FormData = {
  inquiryFirstName: string;
  inquiryFamilyName: string;
  inquiryPosition: string;
  inquiryOrganization: string;
  packetNumber: string;
  inquiryDate: string;
  signatoryFirstName: string;
  signatoryFamilyName: string;
  signatoryPosition: string;
  signatoryOrganization: string;
};
//! API
export type GetSubmitterAddPacketInfoResponse = BPMS_API_RESPONSE<
  {
    inquirerOrganization: string;
    inquirerPost: string;
    inquirerLastName: string;
    inquirerFirstName: string;
    signatoryPost: string;
    signatoryLastName: string;
    inquirerNumber: string;
    signatoryFirstName: string;
    UniCode: string;
    signatoryOrganization: string;
    inquirerNationalCode: string;
    inquirerDateRequest: string;
    dateRegistration: string;
    id: number;
    status: 1;
  }[]
>;
export type SendSubmitterAddPacketInfoRequest = BPMS_API_REQUEST<
  string,
  {
    inquirerFirstName: string;
    inquirerLastName: string;
    inquirerPost: string;
    inquirerOrganization: string;
    signatoryFirstName: string;
    signatoryLastName: string;
    signatoryOrganization: string;
    signatoryPost: string;
    id: number;
    dateRegistration: string;
    inquirerDateRequest: string | null;
    inquirerNationalCode: string;
    inquirerNumber: string | null;
    status: 1;
    UniCode: string;
  }
>;
export type SendSubmitterAddPacketInfoResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
