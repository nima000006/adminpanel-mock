export type InternationalAdmissionListContentType = {
  id: number;
  educationalWayId?: number;
  educationalWay?: string;
  totalTax: number;
  totalDuty: number;
  totalFixedDiscount: number;
  semester: {
    id: number;
    title: string;
    semesterStartDate: string;
    semesterEndDate: string;
  };
  displayStartDate: string;
  displayEndDate: string;
  applicationStartDate: string;
  applicationEndDate: string;
  preRegistrationStartDate: string;
  preRegistrationEndDate: string;
  registrationStartDate: string;
  registrationEndDate: string;
  ruleTitle: string;
  trainingId: number;
  trainingType: string;
  genderId: number;
  genderType: string;
  recordStatus: number;
  citizenId: number;
  citizenship: string;
  currency: string;
  maxSameFieldsReq: number;
  maxSameBranchReq: number;
  faCertificate: boolean;
  interview: boolean;
  minGPU: number;
  maxEntrance: number;
  adsScore: number;
  duration: number;
  languageProficiency: string;
  requiredFields: {
    id: number;
    title: string;
  }[];
  allRegions: boolean;
  regions: {
    id: number;
    regionType: number;
    countryCode: string;
  }[];
  cv: boolean;
  sop: boolean;
};

export type GetInternationalAdmissionListResponse = {
  content: [InternationalAdmissionListContentType[]];
  pageNumber: number;
  pageSize: number;
  first: boolean;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
};

export type GetInternationalAdmissionListRequest = {
  pageNumber: number;
  pageSize: number;
  requestStatus: string;
};
