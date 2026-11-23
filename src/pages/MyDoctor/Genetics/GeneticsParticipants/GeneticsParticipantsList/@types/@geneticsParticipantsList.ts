import {
  IdTitle,
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

//todo[nima] remove figma will be updated
// export const geneticPersonalityTypeOptions = [
//   {
//     value: "MOTORIZED_CRIME_SCENE",
//     title: "موتور چربی سوز",
//     color: "cyan",
//   },
//   {
//     value: "FLEXIBLE_BODY",
//     title: "ژن ارتقاپذیر",
//     color: "blue",
//   },
//   {
//     value: "INJURY_PRONE",
//     title: "ژن آسیب پذیر",
//     color: "red",
//   },
//   {
//     value: "ATHLETIC",
//     title: "ورزشکار ذاتی",
//     color: "orange",
//   },
//   {
//     value: "CONSERVATIVE",
//     title: "ژن محافظ",
//     color: "purple",
//   },
// ] as const;

// export const educationLevelOptions = [
//   {
//     value: "ASSOCIATE",
//     title: "کاردانی",
//     color: "default",
//   },
//   {
//     value: "BACHELOR_CONTINUOUS",
//     title: "کارشناسی - پیوسته",
//     color: "blue",
//   },
//   {
//     value: "BACHELOR_DISCONTINUOUS",
//     title: "کارشناسی - ناپیوسته",
//     color: "blue",
//   },
//   {
//     value: "MASTER_CONTINUOUS",
//     title: "کارشناسی ارشد - پیوسته",
//     color: "orange",
//   },
//   {
//     value: "MASTER_DISCONTINUOUS",
//     title: "کارشناسی ارشد - ناپیوسته",
//     color: "orange",
//   },
//   {
//     value: "PHD_PROFESSIONAL",
//     title: "دکتری حرفه‌ای",
//     color: "cyan",
//   },
//   {
//     value: "PHD_SPECIALIZED",
//     title: "دکتری تخصصی",
//     color: "purple",
//   },
//   {
//     value: "POSTDOCTORAL",
//     title: "فوق دکترا",
//     color: "magenta",
//   },
// ] as const;

// export type GeneticType = (typeof geneticPersonalityTypeOptions)[number]["value"];

// export type Degree = (typeof educationLevelOptions)[number]["value"];

export type myDoctorSurveyAllAdvanceFilterRequest = {
  body: {
    surveyId: number;
    branchId?: number[];
    groupId?: number;
    surveyStatusId?: number[];
    testStatusId?: number[];
    fromRequestedDate?: string;
    toRequestedDate?: string;
    fieldName?: string;
    levelName?: string;
  };
  params: {
    page: number;
    size: number;
    sort?: string[];
  };
};

export type myDoctorSurveyAllAdvanceFilterContentType = {
  id: number;
  username: string;
  userStaffId: number;
  surveyId: number;
  startDate: string;
  endDate: string;
  invoiceId: string;
  paymentPlanId: number;
  paymentStatus: number;
  startSurvey: string;
  firstName: string;
  lastName: string;
  foreignCode: string;
  branchName: string;
  nationalCode: string;
  mobileNumber: string;
  branchCode: number;
  levelName: string;
  fieldName: string;
  studentNumber: string;
  minutesResponseTime: number;
  secondsResponseTime: number;
  score: number;
  modifiedByFirstName: string;
  modifiedByLastName: string;
  mainStatusDto: IdTitle;
  provinceTitle: string;
  cityTitle: string;
  age: number; // it should add to api
};

export type myDoctorSurveyAllAdvanceFilterResponse = {
  totalElements: number;
  isLast: boolean;
  content: myDoctorSurveyAllAdvanceFilterContentType[];
  totalPages: number;
};

export type myDoctorSurveyAllContentType = {
  id: number;
  title: string;
  description: string;
  surveyId: string;
  imageUrl: string;
  surveyStatusType: string;
  surveyStatusId: number;
  price: number;
  discountPrice: number;
  discountRate: number;
  participantCounts: number;
  goals: string;
  termsAndConditions: string;
  dataPrivacyTerm: string;
  tips: string;
  timer: number;
  questionCounts: number;
  beneficiaries: string;
  surveyCycleId: number;
  invoiceBasketId: string;
};
export type myDoctorSurveyAllResponse = {
  totalElements: number;
  isLast: boolean;
  content: myDoctorSurveyAllContentType[];
  totalPages: number;
};

export type myDoctorSurveyAllRequest = {
  page: number;
  size: number;
  sort?: string[];
};

export type myDoctorGetGroupsBySurveyIdRequest = {
  surveyId: string;
};

export type myDoctorGetGroupsBySurveyIdResponse = {
  groupId: number;
  orderId: number;
  title: string;
  group_id: string;
  surveyTitle: string;
  surveyDescription: string;
  groupType: IdTitle;
  name: string;
  scoringFormula: string;
  beShown: boolean;
  hasInner: boolean;
  childGroup: string;
}[];

export type myDoctorGetGroupsStatusIdRequest = {
  groupId: string;
};

export type myDoctorGetGroupsStatusResponse = {
  id: number;
  title: string;
  description: string;
  status: string;
  statusEmergencyType: string;
  statusEmergencyTypeId: number;
  imageUrl: string;
  statusType: string;
  statusTypeId: number;
}[];

export type GeneticsParticipantsListAdvanceFilterFormType = {
  province: SelectType<IdTitleName>[];
  city: SelectType<IdTitleName>[];
  branch: SelectType<IdTitleName>[];
  degree: string;
  field: string;
  axis: SelectType<IdTitleName>;
  axisStatus: SelectType<IdTitleName>[];
  testDate: string[];
};
