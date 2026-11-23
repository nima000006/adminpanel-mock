import { Dispatch, SetStateAction } from "react";

import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!LAYOUT
export type AppealAccusationCaseVoteRegistrationModalProps = {
  isModalOpen: {
    isOpen: boolean;
    id: number | string;
  };
  closeModalHandler: () => void;
  setIsIssuedVoteEdited: Dispatch<SetStateAction<boolean>>;
};
export type AppealAccusationCaseVoteRecords = {
  [key: string]: {
    key: string;
    value: string;
    label: string;
    name: string;
    code: number;
    item: {
      id: number;
      title: string;
    };
  };
};
//!API
export type AppealMeetingInfoToVote = {
  AssociationMeetingAppealsCommittee_meetingDate: string;
  AssociationMeetingAppealsCommittee_meetingNumber: string;
  id: number;
  dateLastStatusChange: string;
}[];
export type GetAppealMeetingInfoToVoteResponse =
  BPMS_API_RESPONSE<AppealMeetingInfoToVote>;
export type SendAppealRegistrationVoteResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
export type SendAppealRegistrationVoteRequest = BPMS_API_REQUEST<
  string,
  {
    appealVoteDesc: string;
    AssociationAppealCommitteeRecords: {
      AssociationAappealPunish: {
        id: number;
        title: string;
      };
      AssociationAappealRulings: {
        id: number;
        title: string;
      };
      certainty: string;
      descAggravation: string;
      executionDate: string;
      executionStatus: string;
      legalArticle: string;
      reasonAggravation: string;
      dateVote: string;
      numberVote: string;
    }[];
    id: number;
    numberAppealPunishments: string;
    numberVotesFavorAppeal: string;
  }
>;
