//! GENERAL

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type FormData = {
  signatoryFamily: string;
  signatoryName: string;
  signatoryOrganization: string;
  signatoryPost: string;
};

export type PacketInformationTabProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
};
//! API
export type SendSignatoryLetterInformationResponse = BPMS_API_RESPONSE<{ id: number }>;
export type SendSignatoryLetterInformationRequest = BPMS_API_REQUEST<
  string,
  {
    id: number;
    respondentFirstName: string;
    respondentLastName: string;
    respondentOrganization: string;
    respondentPost: string;
  }
>;
