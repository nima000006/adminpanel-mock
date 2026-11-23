//! GENERAL

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!LAYOUT
export type ReVotingModalType = {
  isReVotingModalOpen: {
    isOpen: boolean;
    id: number;
  };
  setIsReVotingModalOpen: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number;
    }>
  >;
};
//! API
export type GetReVotingReasonResponse = BPMS_API_RESPONSE<
  {
    title: string;
    id: number;
  }[]
>;
export type SessionReVotingRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationSessionProblems: {
      reasonRevoting: string;
      revoting: true;
      descRevoting: string;
    };
    id: number;
  }
>;
export type SessionReVotingResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
