import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
//!API
type IdTitle = { title: string; id: number };
export type AdmissionDetailBaseInfo = {
  isActive: number;
  AssociationUserGroup: IdTitle[];
  AssociationPaymentType: IdTitle[];
  AssociationSemester: IdTitle[];
  residenceEndDate: string;
  createByUserId: string;
  AssociationNationality: IdTitle[];
  reservationStartTime: string;
  AssociationRoom: IdTitle[];
  AssociationGrade: IdTitle[];
  id: number;
  appliedEndTime: string;
  reviewDeadline: number;
  AssociationCategoryManagementType: IdTitle;
  reservationEndDate: string;
  AssociationCategorySchedulingType: IdTitle;
  extensionStartDate: string;
  reservationStartDate: string;
  extensionEndTime: string;
  AssociationDeliverPlanRoom: {
    floorId: number;
    id: number;
    roomId: number;
    buildingId: number;
  }[];
  fixedLatePenalty: number;
  residenceEndTime: string;
  AssociationInstallmentNumber: IdTitle;
  installmentNumber: number;
  appliedStartTime: string;
  AssociationSpecialStatus: IdTitle[];
  paymentDeadline: number;
  AssociationPaymetMethod: IdTitle[];
  AssociationCanDebt: IdTitle;
  deactivationDate: string;
  maxNumberInstallmentForDebt: number;
  fixedDiscount: number;
  description: string;
  latePercentagepenalty: number;
  title: string;
  showTitle: string;
  extensionStartTime: string;
  AssociationDormitory: IdTitle;
  AssociationCategoryReservationType: IdTitle;
  residenceStartDate: string;
  percentDiscount: number;
  maxDebt: number;
  createDate: string;
  appliedEndDate: string;
  AssociationIsRequestForAnother: IdTitle;
  appliedStartDate: string;
  priceListId: number;
  AssociationCategoryBranch: IdTitle;
  extensionEndDate: string;
  recordStatus: number;
  AssociationBranch: IdTitle[];
  createTime: string;
  residenceStartTime: string;
  reservationEndTime: string;
  AssociationDeliverPlanBuilding: IdTitle[];
  AssociationDeliverPlanFloor: IdTitle[];
  AssociationUserStaffNew: {
    AssociationCustomerUser: {
      firstName: string;
      lastName: string;
      id: number;
    };
    id: number;
  };
};

export type GetAdmissionDetailBaseInfoResponse =
  BPMS_API_RESPONSE<AdmissionDetailBaseInfo>;

export type GetAdmissionDetailBaseInfoRequest = { _data_: { id: string | undefined } };
