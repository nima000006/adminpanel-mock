//! GENERAL

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type ReVotingModalType = {
  isSessionCancelModalOpen: boolean;
  setIsSessionCancelModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
//! API
export type CancelingAccusationOfSessionRequest = BPMS_API_REQUEST<
  string,
  {
    meeting: null;
  }
>;
export type CancelingAccusationOfSessionResponse = BPMS_API_RESPONSE<null>;
export type CancelingSessionRequest = BPMS_API_REQUEST<
  string,
  {
    reasonCancellation: string;
    descCancellation: string;
    lastModifiedDate: Date;
    SessionStatus: string;
    id: number;
  }
>;
export type CancelingSessionResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
