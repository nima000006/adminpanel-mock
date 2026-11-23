import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

export type ReadOnlyIssuedVoteStepProps = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  deleteRequestStatus: boolean | undefined;
};

type DataItem = {
  id: number;
  title: string;
};

export type IssuedVoteType = {
  descEscalation: string; // توضیحات کمیته بدوی
  appealVoteDesc: string; // توضیحات کمیته تجدیدنظر
  centralVoteDesc: string; // توضیحات کمیته مرکزی
  numberPreliminaryPunishments: number; //تعداد تنبیهات بدوی
  numberAppealPunishments: number; // تعداد تنبیهات تجدیدنظر
  numberCentralPunishments: number; // تعداد تنبیهات مرکزی
  AssociationAppealCommitteeRecords: {
    AssociationAappealReasonAggravation: DataItem; // دلیل تشدید حکم
    AssociationAappealExecutionStatus: DataItem; //وضعیت اجرای حکم
    executionDate: string; // تاریخ اجرا حکم
    descAggravation: string; // توضیح تشدید حکم
    AssociationAappealCertainty: DataItem; // قطعیت
    legalArticle: string; //ماده قانونی مرتبط
    AssociationAappealPunish: DataItem; //حکم اولیه
    AssociationAappealRulings: DataItem; // تنبیه انضباطی صادره
    id: number;
  }[];
  AssociationPreliminaryCommitteeRecords: {
    AssociationReasonEscalation: DataItem; // دلیل تشدید حکم
    AssociationExecutionStatus: DataItem; //وضعیت اجرای حکم
    executionDate: string; // تاریخ اجرا حکم
    descAggravation: string; // توضیح تشدید حکم
    AssociationCertainty: DataItem; // قطعیت
    legalArticle: string; //ماده قانونی مرتبط
    AssociationPunish: DataItem; //حکم اولیه
    AssociationRulings: DataItem; // تنبیه انضباطی صادره
    id: number;
  }[];
  AssociationCentralCommitteeRecords: {
    AssociationCentralReasonAggravation: DataItem; // دلیل تشدید حکم
    AssociationCentralExecutionStatus: DataItem; //وضعیت اجرای حکم
    executionDate: string; // تاریخ اجرا حکم
    descAggravation: string; // توضیح تشدید حکم
    AssociationCentralCertainty: DataItem; // قطعیت
    legalArticle: string; //ماده قانونی مرتبط
    AssociationCentralPunish: DataItem; //حکم اولیه
    AssociationCentralRulings: DataItem; // تنبیه انضباطی صادره
    id: number;
  }[];
  AssociationMeeting: {
    meetingNumber: string;
    meetingDate: string;
  };
  AssociationMeetingAppealsCommittee: {
    meetingNumber: string;
    meetingDate: string;
  };
  AssociationCentrulMeeting: {
    meetingNumber: string;
    meetingDate: string;
  };
  id: number;
};

//! API
export type GetIssuedVotesInfoRequest = {
  _data_: {
    id: string;
  };
};

export type GetIssuedVotesInfoResponse = BPMS_API_RESPONSE<{
  descEscalation: string; // توضیحات کمیته بدوی
  appealVoteDesc: string; // توضیحات کمیته تجدیدنظر
  centralVoteDesc: string; // توضیحات کمیته مرکزی
  numberPreliminaryPunishments: number; //تعداد تنبیهات بدوی
  numberAppealPunishments: number; // تعداد تنبیهات تجدیدنظر
  numberCentralPunishments: number; // تعداد تنبیهات مرکزی
  AssociationAppealCommitteeRecords: {
    AssociationAappealReasonAggravation: {
      // دلیل تشدید حکم
      id: number;
      title: string;
    };
    AssociationAappealExecutionStatus: {
      //وضعیت اجرای حکم
      id: number;
      title: string;
    };
    executionDate: string; // تاریخ اجرا حکم
    descAggravation: string; // توضیح تشدید حکم
    AssociationAappealCertainty: {
      // قطعیت
      id: number;
      title: string;
    };
    legalArticle: string; //ماده قانونی مرتبط
    AssociationAappealPunish: {
      //حکم اولیه
      id: number;
      title: string;
    };
    AssociationAappealRulings: {
      // تنبیه انضباطی صادره
      id: number;
      title: string;
    };
    id: number;
  }[];
  AssociationPreliminaryCommitteeRecords: {
    AssociationReasonEscalation: {
      // دلیل تشدید حکم
      id: number;
      title: string;
    };
    AssociationExecutionStatus: {
      //وضعیت اجرای حکم
      id: number;
      title: string;
    };
    executionDate: string; // تاریخ اجرا حکم
    descAggravation: string; // توضیح تشدید حکم
    AssociationCertainty: {
      // قطعیت
      id: number;
      title: string;
    };
    legalArticle: string; //ماده قانونی مرتبط
    AssociationPunish: {
      //حکم اولیه
      id: number;
      title: string;
    };
    AssociationRulings: {
      // تنبیه انضباطی صادره
      id: number;
      title: string;
    };
    id: number;
  }[];
  AssociationCentralCommitteeRecords: {
    AssociationCentralReasonAggravation: {
      // دلیل تشدید حکم
      id: number;
      title: string;
    };
    AssociationCentralExecutionStatus: {
      //وضعیت اجرای حکم
      id: number;
      title: string;
    };
    executionDate: string; // تاریخ اجرا حکم
    descAggravation: string; // توضیح تشدید حکم
    AssociationCentralCertainty: {
      // قطعیت
      id: number;
      title: string;
    };
    legalArticle: string; //ماده قانونی مرتبط
    AssociationCentralPunish: {
      //حکم اولیه
      id: number;
      title: string;
    };
    AssociationCentralRulings: {
      // تنبیه انضباطی صادره
      id: number;
      title: string;
    };
    id: number;
  }[];
  AssociationMeeting: {
    meetingNumber: string;
    meetingDate: string;
  };
  AssociationMeetingAppealsCommittee: {
    meetingNumber: string;
    meetingDate: string;
  };
  AssociationCentrulMeeting: {
    meetingNumber: string;
    meetingDate: string;
  };
  id: number;
}>;
