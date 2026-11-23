import { Key } from "react";

import { FormInstance } from "antd";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";

import { AdmissionModifyFormData } from "../../../@types/@admissionModify";

//! LAYOUTS
export type AdmissionModifyTariffInfoStepProps = {
  setCurrent: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<AdmissionModifyFormData>;
  loading: boolean;
  isReject: boolean;
};

export type DetailTariffDrawerContentProps = {
  closeDrawerHandler: () => void;
  id: number | undefined;
};
export type AdmissionModifyTariffInfoStepTableProps = {
  form: FormInstance<any>;
  onSelectionChange?: (selectedKeys: Key[]) => void;
  isDrawerOpen: {
    isOpen: boolean;
    id: number;
  };
  setIsDrawerOpen: React.Dispatch<
    React.SetStateAction<{
      isOpen: boolean;
      id: number;
    }>
  >;
};

export type mapItemType = {
  children: string;
  code: number;
  disabled: undefined;
  item: { title: string; id: number };
  key: number;
  label: string;
  value: string;
};

//! API
export type GetApplicableTariffsData = {
  branchId: number;
  appliedStartTime: string;
  appliedEndDate: string;
  appliedStartDate: string;
  id: number;
  appliedEndTime: string;
  title: string;
};
export type GetApplicableTariffsResponse = BPMS_API_RESPONSE<GetApplicableTariffsData[]>;

export type GetApplicableTariffsRequest = {
  maxResults: number;
  firstResult: number;
  dormitoryId: number;
  schedulingId: number;
};

export type GetApplicableTariffsCountRequest = {
  dormitoryId: number;
  schedulingId: number;
};

export type SendCreateAdmissionRequest = {
  form: string;
  data: {
    id?: number | null;
    title: string;
    showTitle: string;
    managementTypeId: number;
    branchId: number;
    schedulingId: number;
    semesterId: number;
    reservationTypeId: number;
    AssociationDeliverPlanPaymenttype: {
      paymentTypeId: number;
    }[];
    AssociationDeliverPlanPaymetMethod: {
      paymentMethodId: number;
    }[];
    AssociationDeliverPlanUserGroup: {
      userGroupId: number;
    }[];
    AssociationDeliverPlanNationality: {
      nationalityId: number;
    }[];
    AssociationDeliverPlanGrade: {
      gradeId: number;
    }[];
    AssociationDeliverPlanSpecialStatus: {
      specialStatusId: number;
    }[];
    isRequestForAnother: number;
    reviewDeadline: number;
    canDebt: string;
    paymentDeadline: number;
    maxDebt?: number;
    maxNumberInstallmentForDebt?: number;
    description: string;
    appliedStartDate: string;
    reservationStartDate: string;
    residenceStartDate: string;
    extensionStartDate?: string;
    appliedStartTime?: string;
    reservationStartTime: string;
    residenceStartTime: string;
    extensionStartTime?: string;
    appliedEndDate: string;
    reservationEndDate: string;
    residenceEndDate: string;
    extensionEndDate?: string;
    appliedEndTime?: string;
    reservationEndTime: string;
    residenceEndTime: string;
    extensionEndTime?: string;
    dormitoryId: number;
    installmentNumber: number;
    percentDiscount: number;
    // latePercentagepenalty: number;
    fixedDiscount: number;
    // fixedLatePenalty: number;
    AssociationPresentationBranch: {
      branchId: number;
    }[];
    AssociationDeliverPlanRoom: {
      buildingId: string;
      floorId: string;
      roomId: string;
    }[];
    priceListId: number;
    descRequest: string;
  };
};

export type sendCancellationDeliveryPlanRequest = {
  form: string;
  data: {
    id: string;
    descDeactivateRequest: string;
  };
};
export type SendCreateAdmissionResponse = BPMS_API_RESPONSE<null>;

export type sendCancellationDeliveryPlanResponse = BPMS_API_RESPONSE<null>;
