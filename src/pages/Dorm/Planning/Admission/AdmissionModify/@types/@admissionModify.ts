import dayjs from "dayjs";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//!LAYOUT
type SelectType = {
  key: string;
  value: string;
  children: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type AdmissionModifyFormData = {
  residence: SelectType;
  unitsPresent: SelectType[];
  applicationLevel: number[][];
  title: string;
  managementType: SelectType;
  uni: SelectType;
  timingType: SelectType;
  reservationType: SelectType;
  paymentType: SelectType[];
  paymentMethod: SelectType[];
  userGroup: SelectType[];
  educationDegree: SelectType[];
  nationality: SelectType[];
  specialConditions: SelectType[];
  applyingForAnother: SelectType;
  canDebt: SelectType;
  maxDebt: number;
  installmentMaxNumber: string;
  description: string;
  desc: string;
  startDateApplied: string | dayjs.Dayjs;
  startDateReservation: string;
  startDateDelivery: string;
  startDateExtension: string;
  startTimeApplied: string;
  startTimeReservation: string;
  startTimeDelivery: string;
  startTimeExtension: string;
  endDateApplied: string | dayjs.Dayjs;
  endDateReservation: string;
  endDateDelivery: string;
  endDateExtension: string;
  endTimeApplied: string;
  endTimeReservation: string;
  endTimeDelivery: string;
  endTimeExtension: string;
  discountPercent: number;
  constDiscount: number;
  installmentsNumber: SelectType | null;
  latePenaltyPercent: number;
  constPenaltyPercent: number;
  applicationReviewDeadline: SelectType;
  paymentDeadline: SelectType;
  months: [dayjs.Dayjs, dayjs.Dayjs];
};

//! APIs
export type GeneralSelectResponse = {
  id: number;
  title: string;
  recordStatus: number;
};

export type DormManagementListTypes = {
  IsActive: null;
  id: number;
  title: string;
  recycleBin: null;
  recordStatus: number;
};

export type GetManagementTypeResponse = BPMS_API_RESPONSE<DormManagementListTypes[]>; // نوع مدیریت
export type GetManagementTypeRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

//نوع زمان بندی
export type DormSchedulingType = {
  IsActive: null;
  id: number;
  title: string;
  recycleBin: null;
  recordStatus: number;
};
export type GetSchedulingTypeResponse = BPMS_API_RESPONSE<DormSchedulingType[]>;
export type GetSchedulingTypeRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

// نوع رزرو
export type DormReservationListTypes = {
  IsActive: null;
  id: number;
  title: string;
  recycleBin: null;
  recordStatus: number;
};

export type GetReservationTypeResponse = BPMS_API_RESPONSE<DormReservationListTypes[]>;
export type GetReservationTypeRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type GetPaymentTypeResponse = BPMS_API_RESPONSE<GeneralSelectResponse[]>; // نوع پرداخت
export type GetPaymentTypeRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type GetPaymentMethodResponse = BPMS_API_RESPONSE<GeneralSelectResponse[]>; // شیوه پرداخت
export type GetPaymentMethodRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type GetUserGroupResponse = BPMS_API_RESPONSE<GeneralSelectResponse[]>; // گروه کاربری
export type GetUserGroupRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type GetEducationGradeResponse = BPMS_API_RESPONSE<GeneralSelectResponse[]>; // مقطع تحصیلی
export type GetEducationGradeRequest = { maxResults: number; firstResult: number };

export type GetNationalityResponse = BPMS_API_RESPONSE<
  {
    tenant_id: null;
    branchId: number;
    updateDate: string;
    recordStatus: number;
    createTime: string;
    updateByUserId: string;
    updateTime: string;
    id: number;
    createByUserId: string;
    title: string;
    createDate: string;
  }[]
>; // خوابگاه

export type GetNationalityRequest = { maxResults: number; firstResult: number };

// شرایط خاص
export type SpecialStatusTypes = {
  IsActive: null;
  id: number;
  title: string;
  recycleBin: null;
  recordStatus: number;
};
export type GetSpecialStatusResponse = BPMS_API_RESPONSE<SpecialStatusTypes[]>;
export type GetSpecialStatusRequest = {
  maxResults: number;
  firstResult: number;
  recordStatus_EQ?: string;
};

export type GetFeasibilityResponse = BPMS_API_RESPONSE<GeneralSelectResponse[]>; // امکان پذیری
export type GetFeasibilityRequest = { maxResults: number; firstResult: number };

export type GetNumberInstallmentsResponse = BPMS_API_RESPONSE<GeneralSelectResponse[]>; // تعداد اقساط
export type GetNumberInstallmentsRequest = { maxResults: number; firstResult: number };

export type GetDormListByBranchIdResponse = BPMS_API_RESPONSE<GeneralSelectResponse[]>;
export type GetDormListByBranchIdRequest = {
  maxResults: number;
  firstResult: number;
  branchId: string;
};
//ساختمان
export type BuildingsOfDormitoryType = {
  dormitoryId: number;
  id: number;
  title: string;
};
export type GetBuildingsOfDormitoryResponse = BPMS_API_RESPONSE<
  BuildingsOfDormitoryType[]
>;
export type GetBuildingsOfDormitoryRequest = {
  maxResults: number;
  firstResult: number;
  dormitoryId_EQ: string;
};

// طبقه
export type FloorsOfBuildingType = {
  buildingId: number;
  id: number;
  title: string;
};
export type GetFloorsOfBuildingResponse = BPMS_API_RESPONSE<FloorsOfBuildingType[]>;
export type GetFloorsOfBuildingRequest = {
  maxResults?: number;
  firstResult?: number;
  buildingId_EQ?: string | number;
};

export type FloorDormType = {
  floorId: number;
  id: number;
  title: string;
};
//  اتاق
export type GetRoomsOfFloorResponse = BPMS_API_RESPONSE<FloorDormType[]>;
export type GetRoomsOfFloorRequest = {
  maxResults?: number;
  firstResult?: number;
  floorId_EQ?: string | number;
};
