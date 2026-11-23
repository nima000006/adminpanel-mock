//! LAYOUT
export type InternationalReasonsItemsType = {
  label: string;
  title: string;
  value: string;
  key: number;
  item: {
    id: number;
    title: string;
  };
  code: number;
};

//! APIs
export type GetDemandDetailResponse = {
  firstName: string;
  lastName: string;
  middleName: string;
  nickName: string;
  gender: string;
  birthDate: string;
  nationality: string;
  degreeCourseRequest: string;
  fieldCourseRequest: string;
  branchCourseRequest: string;
  semesterCourseRequest: string;
  degreeRequest: string;
  fieldRequest: string;
  countryRequest: string;
  gpaRequest: number;
  issuingInstitutionRequest: string;
  citizenshipRequest: string;
  countryOfResidenceRequest: string;
  passportNumberRequest: string;
  files: {
    passportPhoto: string;
    Passport: string;
    degreeCertificate: string;
    transcriptCertificate: string;
    resume?: string;
    "pre.university.certificate"?: string;
    "Statement.of.Purpose"?: string;
    residenceCertificate?: string;
  };
  requestDate: string;
  identificationNumber: string;
  iranianGpa: string;
  haveInterview: boolean;
};

export type GetDemandDetailRequestsHistoryResponse = {
  requestHistories: {
    id: 1;
    createDateRequestHistory: string;
    createdByRequestHistory: string;
    fromStatusRequestHistory: null;
    reasons: [];
    adminUsernameRequestHistory: null;
    toStatusRequestHistory: string;
    modifiedDateRequestHistory: null;
    modifiedByUserName: null;
  }[];
  requested: string;
  requestDate: string;
};

export type InternationalRequestReasonsType = {
  id: number;
  title: string;
};

export type GetInternationalRequestReasonsResponse = InternationalRequestReasonsType[];

export type EducationalCheckingStatusResponse = null;

export type EducationalCheckingStatusRequest = {
  interviewMemberRequestDto?: {
    desc: string;
    firstName: string;
    lastName: string;
    role: string;
    username: string;
  };
  interviewRequestDto?: {
    desc: string;
    interviewDate: string;
    link: string;
  };
  reasonIdList: number[];
  reasonTypeId: number;
  requestId: number;
};
