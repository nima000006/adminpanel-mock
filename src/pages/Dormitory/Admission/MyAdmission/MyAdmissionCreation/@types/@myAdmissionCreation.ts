export type CreateMyAdmissionProgramInfoRequest = {
  uuid?: string;
  faTitle: string;
  enTitle?: string;
  arTitle?: string;
  businessId: number;
  branchId: number;
  accommodationUuid: string;
  managementType: string;
  saleUnitType: string;
  visible: boolean;
};

export type CreateMyAdmissionProgramInfoResponse = string;

export type CreateMyAdmissionSchedulingRequest = {
  uuid: string;
  periodType: string;
  academicTermUuid?: string;
  occupancyStartDate: string;
  occupancyEndDate: string;
  reservationStartAt: string;
  reservationEndAt: string;
  bookingMode?: string;
  minStayPeriods?: number;
  maxStayPeriods?: number;
  packageDays: number;
};

export type CreateMyAdmissionSchedulingResponse = string;

export type CreateMyAdmissionRulesFormItem = {
  uuid: string;
  title: string;
};

export type CreateMyAdmissionRulesRegulationItem = {
  templateUuid: string;
  faDescription: string;
};

export type CreateMyAdmissionRulesRequest = {
  uuid: string;
  allowAllBranches: boolean;
  branchIds?: number[];
  gender: string;
  restrictEligibility: boolean;
  userGroupTypes?: string[];
  citizenShip?: string;
  academicDegrees?: string[];
  studyFieldIds?: number[];
  needUploadForms: boolean;
  forms?: CreateMyAdmissionRulesFormItem[];
  regulations?: CreateMyAdmissionRulesRegulationItem[];
  allowGuestInfo: boolean;
};

export type CreateMyAdmissionRulesResponse = string;

export type MyDormitoryUploadFileWithTextRequest = FormData;

export type MyDormitoryUploadFileWithTextResponse = {
  uuid: string;
};
