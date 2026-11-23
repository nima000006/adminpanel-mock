import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "@infra/states/redux/Apis/models/committeeApi.model";
//! GENERAL

//! LAYOUT
export type PartiesInformationStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  violationId: number | null;
  confirm: boolean | undefined;
};
//!API
export type SendRemoveHistoryAgreementRequestModalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationViolationStudent: {
      violationStatus: string;
      id: number | null;
    };
    dateFinalAnswer: string;
    confirmation: boolean;
    status: number;
    id: number;
  }
>;
export type SendRemoveHistoryAgreementRequestModalResponse = BPMS_API_RESPONSE<{
  confirmation: boolean;
  id: number;
}>;
export type SendRemoveHistoryOppositionRequestModalRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationViolationStudent: {
      recycleBin: boolean;
      id: number | null;
    };
    dateFinalAnswer: string;
    confirmation: boolean;
    status: number;
    descRejection: string;
    id: number;
  }
>;
export type SendRemoveHistoryOppositionRequestModalResponse = BPMS_API_RESPONSE<{
  confirmation: boolean;
  id: number;
}>;
