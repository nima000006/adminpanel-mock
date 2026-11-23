import { InvestigationAccusationsVoteIssuedRawResponse } from "../../../../../../components/Committee/HandleProcessing/Accusations/IssuedVote/@types/@issuedVoteTab";
import { isObjectEmpty } from "../../../../utils";

export const accusationCaseIssuedVoteTransformer = (
  data: InvestigationAccusationsVoteIssuedRawResponse
) => {
  if (!isObjectEmpty(data)) {
    const arr = [];
    const preliminary = {
      main: {
        desc: data?.descEscalation,
        punishmentNo: data?.numberPreliminaryPunishments,
        meetingTime: data?.AssociationMeeting?.meetingTime,
        meetingNumber: data?.AssociationMeeting?.meetingNumber,
        meetingDate: data?.AssociationMeeting?.meetingDate,
        meetingEndTime: data?.AssociationMeeting?.meetingEndTime,
        title: "بدوی",
      },
      records: data?.AssociationPreliminaryCommitteeRecords
        ? data?.AssociationPreliminaryCommitteeRecords.map((item) => ({
            reasonAggravation: item.reasonAggravation,
            executionStatus: item.executionStatus,
            executionDate: item.executionDate,
            descAggravation: item.descAggravation,
            certainty: item.certainty,
            legalArticle: item.legalArticle,
            punish: item.AssociationPunish,
            rulings: item.AssociationRulings,
          }))
        : null,
    };
    arr.push(preliminary);

    const appeal = {
      main: {
        desc: data?.appealVoteDesc,
        punishmentNo: data?.numberAppealPunishments,
        meetingTime: data?.AssociationMeetingAppealsCommittee?.meetingTime,
        meetingNumber: data?.AssociationMeetingAppealsCommittee?.meetingNumber,
        meetingDate: data?.AssociationMeetingAppealsCommittee?.meetingDate,
        meetingEndTime: data?.AssociationMeetingAppealsCommittee?.meetingEndTime,
        title: "تجدید نظر",
      },
      records: data?.AssociationAppealCommitteeRecords
        ? data?.AssociationAppealCommitteeRecords.map((item) => ({
            reasonAggravation: item.reasonAggravation,
            executionStatus: item.executionStatus,
            executionDate: item.executionDate,
            descAggravation: item.descAggravation,
            certainty: item.certainty,
            legalArticle: item.legalArticle,
            punish: item.AssociationAappealPunish,
            rulings: item.AssociationAappealRulings,
          }))
        : null,
    };
    arr.push(appeal);

    const central = {
      main: {
        desc: data?.centralVoteDesc,
        punishmentNo: data?.numberCentralPunishments,
        meetingTime: data?.AssociationCentrulMeeting?.meetingTime,
        meetingNumber: data?.AssociationCentrulMeeting?.meetingNumber,
        meetingDate: data?.AssociationCentrulMeeting?.meetingDate,
        meetingEndTime: data?.AssociationCentrulMeeting?.meetingEndTime,
        title: "مرکزی",
      },
      records: data?.AssociationCentralCommitteeRecords
        ? data?.AssociationCentralCommitteeRecords.map((item) => ({
            reasonAggravation: item.reasonAggravation,
            executionStatus: item.executionStatus,
            executionDate: item.executionDate,
            descAggravation: item.descAggravation,
            certainty: item.certainty,
            legalArticle: item.legalArticle,
            punish: item.AssociationCentralPunish,
            rulings: item.AssociationCentralRulings,
          }))
        : null,
    };

    arr.push(central);

    return {
      data: arr,
      status: 200,
      msg: "success",
    };
  } else {
    return {
      data: [],
      status: 403,
      msg: "fail",
    };
  }
};
