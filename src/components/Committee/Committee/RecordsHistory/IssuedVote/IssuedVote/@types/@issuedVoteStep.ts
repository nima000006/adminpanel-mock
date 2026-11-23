import {
  BPMS_API_REQUEST,
  BPMS_API_RESPONSE,
} from "../../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//! GENERAL
export type IssuedVoteStepProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export type punishmentCountType = {
  preliminaryPunishmentQty: [] | number[];
  appealPunishmentQty: [] | number[];
  centralPunishmentQty: [] | number[];
};

//! LAYOUT
//! API
export type CreateAndEditIssuedVotesRequest = BPMS_API_REQUEST<
  string,
  {
    descEscalation: string; // توضیحات کمیته بدوی
    appealVoteDesc: string; // توضیحات کمیته تجدیدنظر
    centralVoteDesc: string; // توضیحات کمیته مرکزی
    numberPreliminaryPunishments: string; //تعداد تنبیهات بدوی
    numberAppealPunishments: string; // تعداد تنبیهات تجدیدنظر
    numberCentralPunishments: string;
    AssociationMeeting: {
      meetingDate: string;
      meetingNumber: string;
    };
    AssociationPreliminaryCommitteeRecords: {
      AssociationRulings: { id: number; title: string };
      AssociationCertainty: { id: number; title: string };
      AssociationExecutionStatus: { id: number; title: string };
      executionDate: string;
      legalArticle: string;
      AssociationReasonEscalation?: { id: number; title: string };
      AssociationPunish?: { id: number; title: string };
      descAggravation?: string;
    }[];
    AssociationMeetingAppealsCommittee: {
      meetingDate: string;
      meetingNumber: string;
    };
    AssociationAppealCommitteeRecords: {
      AssociationAappealRulings: { id: number; title: string };
      AssociationAappealCertainty: { id: number; title: string };
      AssociationAappealExecutionStatus: { id: number; title: string };
      executionDate: string;
      legalArticle: string;
      AssociationAappealReasonAggravation?: { id: number; title: string };
      AssociationAappealPunish?: { id: number; title: string };
      descAggravation?: string;
    }[];
    AssociationCentrulMeeting: {
      meetingDate: string;
      meetingNumber: string;
    };
    AssociationCentralCommitteeRecords: {
      AssociationCentralRulings: { id: number; title: string };
      AssociationCentralCertainty: { id: number; title: string };
      AssociationCentralExecutionStatus: { id: number; title: string };
      executionDate: string;
      legalArticle: string;
      AssociationCentralReasonAggravation?: { id: number; title: string };
      AssociationCentralPunish?: { id: number; title: string };
      descAggravation?: string;
    }[];
    violationStatus: number;
    recordsStage: number;
    dateLastStatusChange: string;
    id: number;
  }
>;

export type CreateAndEditIssuedVotesResponse = BPMS_API_RESPONSE<{
  id: number;
}>;
