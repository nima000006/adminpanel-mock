import { GetTotalDataInResearchSectionRawResponse } from "../../../../components/Committee/HandleProcessing/Accusations/AdditionalResearch/@types/@additionalResearchTab";
import { GetStudentDefenseTabRawResponse } from "../../../../components/Committee/HandleProcessing/Accusations/StudentDefense/@types/@studentDefenseTab";
export type GetSecurityDataInResearchSection = {
  AssociationReferral_appealSecurityDesc: string;
  AssociationReferral_appealReferralToCustody: boolean;
  AssociationReferral_CentralReferralToCustody: boolean;
  AssociationReferral_CentralSecurityOpinion: string;
  AssociationReferral_appealSecurityOpinion: string;
  AssociationReferral_CentralSecurityDesc: string;
  id: number;
  AssociationReferral_registerComment: string;
  AssociationReferral_dateResponseCentralSecurity: string;
  AssociationReferral_dateResponseSecurity: string;
  AssociationReferral_dateAppealSecurity: string;
  AssociationReferral_sentToSecurity: string;
  AssociationReferral_dateResponseAppealSecurity: string;
  AssociationReferral_dateCentralSecurity: string;
  AssociationReferral_descSecurity: string;
  AssociationReferral_dateSentToSecurity: string;
}[];
export type GetEducationalDataInResearchSectionResponse = {
  AssociationReferral_dateAppealEducationalAssistant: string;
  AssociationReferral_dateResponseCentralEducationalAssistant: string;
  AssociationReferral_registerCommentEduAssistant: string;
  AssociationReferral_dateSentToEducationalAssistant: string;
  AssociationReferral_appealEducAssistantOpinion: string;
  AssociationReferral_appealEducAssistantDesc: string;
  AssociationReferral_CentralEducAssistantOpinion: string;
  AssociationReferral_CommentRegistrEduAssistant: string;
  AssociationReferral_sentToEducationalAssistant: null;
  AssociationReferral_appealReferralToEducAssistant: boolean;
  AssociationReferral_dateResponseAppealEducationalAssistant: string;
  AssociationReferral_dateResponseEducationalAssistant: string;
  AssociationReferral_CentralEducAssistantDesc: string;
  AssociationReferral_dateCentralEducationalAssistant: string;
  id: 100;
  AssociationReferral_CentralReferralToEducAssistant: null;
}[];
export type GetResearchDataInResearchSectionResponse = {
  AssociationReferral_CentralReferralToResearchAssistant: boolean;
  AssociationReferral_registerCommentResrchAssis: string;
  AssociationReferral_dateResponseCentralResearchAssistant: string;
  AssociationReferral_appealResearchAssistantOpinion: string;
  AssociationReferral_dateSentToResearchAssistant: string;
  AssociationReferral_appealReferralToResearchAssistant: boolean;
  AssociationReferral_CommentRegistrResrchAssis: string;
  AssociationReferral_CentralResearchAssistantDesc: string;
  AssociationReferral_CentralResearchAssistantOpinion: string;
  AssociationReferral_dateResponseResearchAssistant: string;
  AssociationReferral_dateAppealResearchAssistant: string;
  AssociationReferral_sentToResearchAssistant: string;
  id: number;
  AssociationReferral_appealResearchAssistantDesc: string;
  AssociationReferral_dateCentralResearchAssistant: string;
  AssociationReferral_dateResponseAppealResearchAssistant: string;
}[];
export type GetStudentDataInResearchSectionResponse = {
  AssociationReferral_dateSentToStudentVice: string;
  AssociationReferral_dateResponseAppealStudentVice: string;
  AssociationReferral_CentralStudentViceOpinion: string;
  AssociationReferral_CommentRegistrStudentVice: string;
  AssociationReferral_appealStudentViceOpinion: string;
  AssociationReferral_registerCommentStudentVice: string;
  AssociationReferral_appealStudentViceDesc: string;
  AssociationReferral_CentralReferralToStudentVice: boolean;
  AssociationReferral_dateCentralStudentVice: string;
  AssociationReferral_dateResponseStudentVice: string;
  AssociationReferral_dateResponseCentralStudentVice: string;
  AssociationReferral_sentToStudentVice: string;
  AssociationReferral_CentralStudentViceDesc: string;
  AssociationReferral_dateAppealStudentVice: string;
  id: number;
  AssociationReferral_appealReferralToStudentVice: boolean;
}[];

// security
export const getSecurityDataInResearchSectionTransformer = (
  response: GetSecurityDataInResearchSection
) => {
  if (Array.isArray(response)) {
    const arr = [];
    if (response[0]?.AssociationReferral_dateSentToSecurity) {
      arr.push({
        date: response[0]?.AssociationReferral_dateSentToSecurity,
        generalDate: response[0]?.AssociationReferral_dateResponseSecurity,
        comment: response[0]?.AssociationReferral_registerComment,
        desc: response[0]?.AssociationReferral_descSecurity,
        section: "حراست",
        label: "کمیته بدوی",
      });
    }
    if (response[0]?.AssociationReferral_dateAppealSecurity) {
      arr.push({
        date: response[0]?.AssociationReferral_dateAppealSecurity,
        generalDate: response[0]?.AssociationReferral_dateResponseAppealSecurity,
        comment: response[0]?.AssociationReferral_appealSecurityOpinion,
        desc: response[0]?.AssociationReferral_appealSecurityDesc,
        section: "حراست",
        label: "کمیته تجدید نظر",
      });
    }
    if (response[0]?.AssociationReferral_dateCentralSecurity) {
      arr.push({
        date: response[0]?.AssociationReferral_dateCentralSecurity,
        generalDate: response[0]?.AssociationReferral_dateResponseCentralSecurity,
        comment: response[0]?.AssociationReferral_CentralSecurityOpinion,
        desc: response[0]?.AssociationReferral_CentralSecurityDesc,
        section: "حراست",
        label: "کمیته مرکزی",
      });
    }

    return {
      data: arr,
      status: 200,
      msg: "success",
    };
  } else {
    return {
      data: response,
      status: 403,
      msg: "fail",
    };
  }
};

// educational
export const getEducationalDataInResearchSectionTransformer = (
  response: GetEducationalDataInResearchSectionResponse
) => {
  if (Array.isArray(response)) {
    const arr = [];
    if (response[0]?.AssociationReferral_dateSentToEducationalAssistant) {
      arr.push({
        date: response[0]?.AssociationReferral_dateSentToEducationalAssistant,
        generalDate: response[0]?.AssociationReferral_dateResponseEducationalAssistant,
        comment: response[0]?.AssociationReferral_registerCommentEduAssistant,
        desc: response[0]?.AssociationReferral_CommentRegistrEduAssistant,
        section: "معاونت آموزشی",
        label: "کمیته بدوی",
      });
    }
    if (response[0]?.AssociationReferral_dateAppealEducationalAssistant) {
      arr.push({
        date: response[0]?.AssociationReferral_dateAppealEducationalAssistant,
        generalDate:
          response[0]?.AssociationReferral_dateResponseAppealEducationalAssistant,
        comment: response[0]?.AssociationReferral_appealEducAssistantOpinion,
        desc: response[0]?.AssociationReferral_appealEducAssistantDesc,
        section: "معاونت آموزشی",
        label: "کمیته تجدید نظر",
      });
    }
    if (response[0]?.AssociationReferral_dateCentralEducationalAssistant) {
      arr.push({
        date: response[0]?.AssociationReferral_dateCentralEducationalAssistant,
        generalDate:
          response[0]?.AssociationReferral_dateResponseCentralEducationalAssistant,
        comment: response[0]?.AssociationReferral_CentralEducAssistantOpinion,
        desc: response[0]?.AssociationReferral_CentralEducAssistantDesc,
        section: "معاونت آموزشی",
        label: "کمیته مرکزی",
      });
    }

    return {
      data: arr,
      status: 200,
      msg: "success",
    };
  } else {
    return {
      data: response,
      status: 403,
      msg: "fail",
    };
  }
};

//research
export const getResearchDataInResearchSectionTransformer = (
  response: GetResearchDataInResearchSectionResponse
) => {
  if (Array.isArray(response)) {
    const arr = [];
    if (response[0]?.AssociationReferral_dateSentToResearchAssistant) {
      arr.push({
        date: response[0]?.AssociationReferral_dateSentToResearchAssistant,
        generalDate: response[0]?.AssociationReferral_dateResponseResearchAssistant,
        comment: response[0]?.AssociationReferral_registerCommentResrchAssis,
        desc: response[0]?.AssociationReferral_CommentRegistrResrchAssis,
        section: "معاونت پژوهشی",
        label: "کمیته بدوی",
      });
    }
    if (response[0]?.AssociationReferral_dateAppealResearchAssistant) {
      arr.push({
        date: response[0]?.AssociationReferral_dateAppealResearchAssistant,
        generalDate: response[0]?.AssociationReferral_dateResponseAppealResearchAssistant,
        comment: response[0]?.AssociationReferral_appealResearchAssistantOpinion,
        desc: response[0]?.AssociationReferral_appealResearchAssistantDesc,
        section: "معاونت پژوهشی",
        label: "کمیته تجدید نظر",
      });
    }
    if (response[0]?.AssociationReferral_dateCentralResearchAssistant) {
      arr.push({
        date: response[0]?.AssociationReferral_dateCentralResearchAssistant,
        generalDate:
          response[0]?.AssociationReferral_dateResponseCentralResearchAssistant,
        comment: response[0]?.AssociationReferral_CentralResearchAssistantOpinion,
        desc: response[0]?.AssociationReferral_CentralResearchAssistantDesc,
        section: "معاونت پژوهشی",
        label: "کمیته مرکزی",
      });
    }

    return {
      data: arr,
      status: 200,
      msg: "success",
    };
  } else {
    return {
      data: response,
      status: 403,
      msg: "fail",
    };
  }
};
// student
export const getStudentDataInResearchSectionTransformer = (
  response: GetStudentDataInResearchSectionResponse
) => {
  if (Array.isArray(response)) {
    const arr = [];
    if (response[0]?.AssociationReferral_dateSentToStudentVice) {
      arr.push({
        date: response[0]?.AssociationReferral_dateSentToStudentVice,
        generalDate: response[0]?.AssociationReferral_dateResponseStudentVice,
        comment: response[0]?.AssociationReferral_registerCommentStudentVice,
        desc: response[0]?.AssociationReferral_CommentRegistrStudentVice,
        section: "معاونت دانشجویی",
        label: "کمیته بدوی",
      });
    }
    if (response[0]?.AssociationReferral_dateAppealStudentVice) {
      arr.push({
        date: response[0]?.AssociationReferral_dateAppealStudentVice,
        generalDate: response[0]?.AssociationReferral_dateResponseAppealStudentVice,
        comment: response[0]?.AssociationReferral_appealStudentViceOpinion,
        desc: response[0]?.AssociationReferral_appealStudentViceDesc,
        section: "معاونت دانشجویی",
        label: "کمیته تجدید نظر",
      });
    }
    if (response[0]?.AssociationReferral_dateCentralStudentVice) {
      arr.push({
        date: response[0]?.AssociationReferral_dateCentralStudentVice,
        generalDate: response[0]?.AssociationReferral_dateResponseCentralStudentVice,
        comment: response[0]?.AssociationReferral_CentralStudentViceOpinion,
        desc: response[0]?.AssociationReferral_CentralStudentViceDesc,
        section: "معاونت دانشجویی",
        label: "کمیته مرکزی",
      });
    }

    return {
      data: arr,
      status: 200,
      msg: "success",
    };
  } else {
    return {
      data: response,
      status: 403,
      msg: "fail",
    };
  }
};

export const getStudentDefenseTabTransformer = (
  response: GetStudentDefenseTabRawResponse[]
) => {
  if (Array.isArray(response)) {
    const arr = [];
    if (response[0]?.dateReferralForDefense) {
      arr.push({
        date: response[0]?.dateReferralForDefense,
        generalDate: response[0]?.defenseRegistrationDate,
        desc: response[0]?.defenseText,
        label: "دفاعیه کمیته بدوی",
      });
    }
    if (response[0]?.dateAppealReferralForDefense) {
      arr.push({
        date: response[0]?.dateAppealReferralForDefense,
        generalDate: response[0]?.appealDefenseRegistrationDate,
        desc: response[0]?.appealDefenseText,
        label: "دفاعیه کمیته تجدید نظر",
      });
    }
    if (response[0]?.dateCentralReferralForDefense) {
      arr.push({
        date: response[0]?.dateCentralReferralForDefense,
        generalDate: response[0]?.centralDefenseRegistrationDate,
        desc: response[0]?.centralDefenseText,
        label: "دفاعیه کمیته مرکزی",
      });
    }

    return {
      data: arr,
      status: 200,
      msg: "success",
    };
  } else {
    return {
      data: response,
      status: 403,
      msg: "fail",
    };
  }
};

export const getTotalDataInResearchSectionTransformer = (
  response: GetTotalDataInResearchSectionRawResponse
) => {
  // 1 - بدوی ==> a- حراست b- معاونت آموزشی c- معاونت پژوهشی d- معاونت دانشجویی
  // 2 - تجدید نظر ==>  a- حراست b- معاوننت آموزشی c- معاونت پژوهشی d- معاونت دانشجویی
  // 3 - مرکزی ==>  a- حراست b- معاوننت آموزشی c- معاونت پژوهشی d- معاونت دانشجویی
  if (Array.isArray(response)) {
    const arr = [];
    if (response[0]?.AssociationReferral_dateSentToSecurity) {
      arr.push({
        date: response[0]?.AssociationReferral_dateSentToSecurity,
        generalDate: response[0]?.AssociationReferral_dateResponseSecurity,
        comment: response[0]?.AssociationReferral_registerComment,
        desc: response[0]?.AssociationReferral_descSecurity,
        section: "حراست",
        label: "کمیته بدوی",
      });
    }
    if (response[0]?.AssociationReferral_dateSentToEducationalAssistant) {
      arr.push({
        date: response[0]?.AssociationReferral_dateSentToEducationalAssistant,
        generalDate: response[0]?.AssociationReferral_dateResponseEducationalAssistant,
        comment: response[0]?.AssociationReferral_registerCommentEduAssistant,
        desc: response[0]?.AssociationReferral_CommentRegistrEduAssistant,
        section: "معاونت آموزشی",
        label: "کمیته بدوی",
      });
    }
    if (response[0]?.AssociationReferral_dateSentToResearchAssistant) {
      arr.push({
        date: response[0]?.AssociationReferral_dateSentToResearchAssistant,
        generalDate: response[0]?.AssociationReferral_dateResponseResearchAssistant,
        comment: response[0]?.AssociationReferral_registerCommentResrchAssis,
        desc: response[0]?.AssociationReferral_CommentRegistrResrchAssis,
        section: "معاونت پژوهشی",
        label: "کمیته بدوی",
      });
    }
    if (response[0]?.AssociationReferral_dateSentToStudentVice) {
      arr.push({
        date: response[0]?.AssociationReferral_dateSentToStudentVice,
        generalDate: response[0]?.AssociationReferral_dateResponseStudentVice,
        comment: response[0]?.AssociationReferral_registerCommentStudentVice,
        desc: response[0]?.AssociationReferral_CommentRegistrStudentVice,
        section: "معاونت دانشجویی",
        label: "کمیته بدوی",
      });
    }
    if (response[0]?.AssociationReferral_dateAppealSecurity) {
      arr.push({
        date: response[0]?.AssociationReferral_dateAppealSecurity,
        generalDate: response[0]?.AssociationReferral_dateResponseAppealSecurity,
        comment: response[0]?.AssociationReferral_appealSecurityOpinion,
        desc: response[0]?.AssociationReferral_appealSecurityDesc,
        section: "حراست",
        label: "کمیته تجدید نظر",
      });
    }
    if (response[0]?.AssociationReferral_dateAppealEducationalAssistant) {
      arr.push({
        date: response[0]?.AssociationReferral_dateAppealEducationalAssistant,
        generalDate:
          response[0]?.AssociationReferral_dateResponseAppealEducationalAssistant,
        comment: response[0]?.AssociationReferral_appealEducAssistantOpinion,
        desc: response[0]?.AssociationReferral_appealEducAssistantDesc,
        section: "معاونت آموزشی",
        label: "کمیته تجدید نظر",
      });
    }
    if (response[0]?.AssociationReferral_dateAppealResearchAssistant) {
      arr.push({
        date: response[0]?.AssociationReferral_dateAppealResearchAssistant,
        generalDate: response[0]?.AssociationReferral_dateResponseAppealResearchAssistant,
        comment: response[0]?.AssociationReferral_appealResearchAssistantOpinion,
        desc: response[0]?.AssociationReferral_appealResearchAssistantDesc,
        section: "معاونت پژوهشی",
        label: "کمیته تجدید نظر",
      });
    }
    if (response[0]?.AssociationReferral_dateAppealStudentVice) {
      arr.push({
        date: response[0]?.AssociationReferral_dateAppealStudentVice,
        generalDate: response[0]?.AssociationReferral_dateResponseAppealStudentVice,
        comment: response[0]?.AssociationReferral_appealStudentViceOpinion,
        desc: response[0]?.AssociationReferral_appealStudentViceDesc,
        section: "معاونت دانشجویی",
        label: "کمیته تجدید نظر",
      });
    }
    if (response[0]?.AssociationReferral_dateCentralSecurity) {
      arr.push({
        date: response[0]?.AssociationReferral_dateCentralSecurity,
        generalDate: response[0]?.AssociationReferral_dateResponseCentralSecurity,
        comment: response[0]?.AssociationReferral_CentralSecurityOpinion,
        desc: response[0]?.AssociationReferral_CentralSecurityDesc,
        section: "حراست",
        label: "کمیته مرکزی",
      });
    }
    if (response[0]?.AssociationReferral_dateCentralEducationalAssistant) {
      arr.push({
        date: response[0]?.AssociationReferral_dateCentralEducationalAssistant,
        generalDate:
          response[0]?.AssociationReferral_dateResponseCentralEducationalAssistant,
        comment: response[0]?.AssociationReferral_CentralEducAssistantOpinion,
        desc: response[0]?.AssociationReferral_CentralEducAssistantDesc,
        section: "معاونت آموزشی",
        label: "کمیته مرکزی",
      });
    }
    if (response[0]?.AssociationReferral_dateCentralResearchAssistant) {
      arr.push({
        date: response[0]?.AssociationReferral_dateCentralResearchAssistant,
        generalDate:
          response[0]?.AssociationReferral_dateResponseCentralResearchAssistant,
        comment: response[0]?.AssociationReferral_CentralResearchAssistantOpinion,
        desc: response[0]?.AssociationReferral_CentralResearchAssistantDesc,
        section: "معاونت پژوهشی",
        label: "کمیته مرکزی",
      });
    }
    if (response[0]?.AssociationReferral_dateCentralStudentVice) {
      arr.push({
        date: response[0]?.AssociationReferral_dateCentralStudentVice,
        generalDate: response[0]?.AssociationReferral_dateResponseCentralStudentVice,
        comment: response[0]?.AssociationReferral_CentralStudentViceOpinion,
        desc: response[0]?.AssociationReferral_CentralStudentViceDesc,
        section: "معاونت دانشجویی",
        label: "کمیته مرکزی",
      });
    }
    return {
      data: arr,
      status: 200,
      msg: "success",
    };
  } else {
    return {
      data: response,
      status: 403,
      msg: "fail",
    };
  }
};
