import { BPMS_API_RESPONSE } from "../../../../../../infrastructure/states/redux/Apis/models/committeeApi.model";

//!API
export type InvestigationAccusationsVoteIssuedData = {
  main: {
    desc: string;
    punishmentNo: string;
    meetingTime: string | null; // Allow null values
    meetingNumber: string | null; // Allow null values
    meetingDate: string | null; // Allow null values
    meetingEndTime: string | null; // Allow null values
    title: string;
  };
  records:
    | {
        reasonAggravation: string;
        executionStatus: string;
        executionDate: string;
        descAggravation: string;
        certainty: string;
        legalArticle: string;
        punish: {
          id: number;
          title: string;
        } | null;
        rulings: {
          id: number;
          title: string;
        } | null;
      }[]
    | null;
};
export type InvestigationAccusationsVoteIssuedResponse = BPMS_API_RESPONSE<
  InvestigationAccusationsVoteIssuedData[]
>;

export type InvestigationAccusationsVoteIssuedRequest = {
  _data_: {
    id: string;
  };
};
export type InvestigationAccusationsVoteIssuedRawResponse = {
  id: number;
  //توضیحات
  descEscalation: string;
  appealVoteDesc: string;
  centralVoteDesc: string;
  //تنبیهات
  numberPreliminaryPunishments: string;
  numberAppealPunishments: string;
  numberCentralPunishments: string;
  AssociationMeeting: {
    meetingTime: string | null;
    meetingNumber: string | null;
    meetingDate: string | null;
    meetingEndTime: string | null;
  };
  AssociationMeetingAppealsCommittee: {
    meetingTime: string | null;
    meetingNumber: string | null;
    meetingDate: string | null;
    meetingEndTime: string | null;
  };
  AssociationCentrulMeeting: {
    meetingTime: string | null;
    meetingNumber: string | null;
    meetingDate: string | null;
    meetingEndTime: string | null;
  };
  AssociationPreliminaryCommitteeRecords: {
    reasonAggravation: string | null;
    executionStatus: string | null;
    executionDate: string | null;
    descAggravation: string | null;
    certainty: string | null;
    legalArticle: string | null;
    AssociationPunish: {
      id: number;
      title: string;
    } | null;
    AssociationRulings: {
      id: number;
      title: string;
    } | null;
  }[];
  AssociationAppealCommitteeRecords: {
    reasonAggravation: string | null;
    executionStatus: string | null;
    executionDate: string | null;
    descAggravation: string | null;
    certainty: string | null;
    legalArticle: string | null;
    AssociationAappealRulings: {
      id: number;
      title: string;
    } | null;
    AssociationAappealPunish: {
      id: number;
      title: string;
    } | null;
  }[];
  AssociationCentralCommitteeRecords: {
    reasonAggravation: string | null;
    executionStatus: string | null;
    executionDate: string | null;
    descAggravation: string | null;
    certainty: string | null;
    legalArticle: string | null;
    AssociationCentralPunish: {
      id: number;
      title: string;
    } | null;
    AssociationCentralRulings: {
      id: number;
      title: string;
    } | null;
  }[];
};
