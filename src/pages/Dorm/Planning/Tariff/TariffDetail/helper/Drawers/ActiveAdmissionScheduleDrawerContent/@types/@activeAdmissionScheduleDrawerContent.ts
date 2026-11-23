import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

//! LAYOUT
export type ActiveAdmissionScheduleDrawerPropsType = {
  closeDrawerHandler: () => void;
  id: number | undefined;
};

export type AdmissionDrawerBasicInfoSectionProps = {
  admissionDrawerDetail: GetAdmissionDrawerDetailBaseInfoResponse | undefined;
};

//! APIS
type idTitle = {
  title: string;
  id: number;
};
export type AdmissionDetailDrawer = {
  AssociationUserGroup: idTitle[];
  AssociationPaymentType: idTitle[];
  residenceEndDate: string;
  createByUserId: string;
  AssociationNationality: idTitle[];
  reservationStartTime: string;
  AssociationRoom: idTitle[];
  AssociationGrade: idTitle[];
  id: number;
  appliedEndTime: string;
  reviewDeadline: number;
  AssociationCategoryManagementType: idTitle;
  reservationEndDate: string;
  AssociationCategorySchedulingType: idTitle;
  extensionStartDate: string;
  reservationStartDate: string;
  extensionEndTime: string;
  fixedLatePenalty: number;
  residenceEndTime: string;
  AssociationInstallmentNumber: idTitle[];
  installmentNumber: number;
  appliedStartTime: string;
  AssociationSpecialStatus: idTitle[];
  paymentDeadline: number;
  AssociationPaymetMethod: idTitle[];
  canDebt: number;
  deactivationDate: string;
  maxNumberInstallmentForDebt: number;
  fixedDiscount: number;
  description: string;
  latePercentagepenalty: number;
  title: string;
  extensionStartTime: string;
  AssociationDormitory: idTitle;
  AssociationCategoryReservationType: idTitle;
  residenceStartDate: string;
  percentDiscount: number;
  maxDebt: number;
  createDate: string;
  appliedEndDate: string;
  isRequestForAnother: number;
  appliedStartDate: string;
  priceListId: number;
  AssociationCategoryBranch: idTitle;
  extensionEndDate: string;
  recordStatus: number;
  AssociationBranch: idTitle[];
  createTime: string;
  residenceStartTime: string;
  reservationEndTime: string;
  showTitle: string;
};
export type GetAdmissionDrawerDetailBaseInfoResponse =
  BPMS_API_RESPONSE<AdmissionDetailDrawer>;
export type GetAdmissionDrawerDetailBaseInfoRequest = {
  body: {
    _data_: {
      id: string;
    };
  };
  params: {
    relation: string;
  };
};

export type ExtraTreeNodeTypes = {
  isDorm: boolean;
  isBuilding: boolean;
  isFloor: boolean;
  buildingId: number;
  floorId: number;
};
