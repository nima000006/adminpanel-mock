import { Dispatch, SetStateAction } from "react";

import { FormInstance } from "antd";

import { GeneralSelectOutPut } from "../../../../../../infrastructure/helpers/GeneralHelpers/generalModel/generalModel";
import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
export type PunishmentFormType = {
  toBePresent_research: true;
  numberVotesFavorpPrimitive: GeneralSelectOutPut;
  numberPreliminaryPunishments: GeneralSelectOutPut;
  sentenceIntensificationDescription: string;
};

//!layout
export type AccusationCaseVoteRegistrationModalProps = {
  isModalOpen: {
    isOpen: boolean;
    id: number | string;
  };
  closeModalHandler: () => void;
  setIsIssuedVoteEdited: Dispatch<SetStateAction<boolean>>;
};

export type PunishmentProps = {
  count: number;
  form: FormInstance<PunishmentFormType>;
};
//!API
export type GetPunishmentsListResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type GetCertaintyListResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type GetExecutionListResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type GetLegalArticleListResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type GetReasonEscalationListResponse = BPMS_API_RESPONSE<
  {
    id: number;
    title: string;
  }[]
>;
export type RegisterPrimaryVoteRequest = BPMS_API_REQUEST<
  string,
  {
    numberPreliminaryPunishments: string;
    numberVotesFavorpPrimitive: string;
    id: number;
    AssociationPreliminaryCommitteeRecords: {
      reasonAggravation: string;
      executionStatus: string;
      executionDate: string;
      descAggravation: string;
      certainty: string;
      legalArticle: string;
      AssociationRulings: {
        id: number;
        title: string;
      };
      AssociationPunish: {
        id: number;
        title: string;
      };
    }[];
  }
>;
export type RegisterPrimaryVoteResponse = BPMS_API_RESPONSE<{ id: number }>;
