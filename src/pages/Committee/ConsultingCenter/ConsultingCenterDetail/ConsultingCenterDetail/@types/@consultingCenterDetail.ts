import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
//! LAYOUT
//! API
export type GetConsultingCenterDetailReferralInfoResponse = BPMS_API_RESPONSE<
  {
    AssociationReferral_descSendToConsultant: string;
    id: number;
    AssociationReferral_dateReportSendToConsultant: string;
    AssociationReferral_reasonSendToConsultant: string;
  }[]
>;
export type SendConsultingRegisterCommentRequest = {
  form: "RegisteringOpinionConsultant";
  id: "cfcf2a7b3c7e4778970a042cdc9fd070";
  _data_: {
    AssociationReferral: {
      recordOpinionCounseling: string;
      dateResponseCounseling: string;
      descCounseling: string;
      id: number | null;
    };
  };
};
export type SendConsultingRegisterCommentResponse = BPMS_API_RESPONSE<{
  recordOpinionCounseling: string;
  dateResponseCounseling: number;
  reasonCanceling: string;
  id: number;
}>;
