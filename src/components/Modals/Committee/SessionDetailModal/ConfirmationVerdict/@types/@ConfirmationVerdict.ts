import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
export type ConfirmationVerdictModalType = {
  isConfirmationModalOpen: {
    isOpen: boolean;
    id: number;
  };
  setIsConfirmationModalOpen: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number;
    }>
  >;
};
//! API
export type GetReasonConfirmingVerdictResponse = BPMS_API_RESPONSE<
  {
    title: string;
    id: number;
  }[]
>;
export type ConfirmationVerdictRequest = BPMS_API_REQUEST<
  string,
  {
    AssociationSessionProblems: {
      reasonConfirmationVerdict: string;
      confirmationVerdict: true;
      descConfirmationVerdict: string;
    };
    id: number;
  }
>;
export type ConfirmationVerdictResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
