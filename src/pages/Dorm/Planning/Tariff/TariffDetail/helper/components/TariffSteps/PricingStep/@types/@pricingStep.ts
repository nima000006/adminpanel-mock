import { FormInstance } from "antd";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
import { DormTariffModifyFormType } from "@pages/Dorm/Planning/Tariff/TariffModify/@types/@tariffModifyType";

//! GENERAL
//! LAYOUT
export type TablePricingViewAndCreateProps = {
  type?: number | undefined;
  form?: FormInstance<any>;
  dormId?: DormTariffModifyFormType;
  onGetCreatePricingStep: any;
  loading: boolean;
  createDataSource: GetCreatePricingStep[];
  setCreateDataSource: React.Dispatch<React.SetStateAction<GetCreatePricingStep[]>>;
  lastDormId?: number | undefined;
};
//! APIS
export type GetPricingStepRequest = {
  maxResults: number;
  firstResult: number;
  priceListId_EQ?: number;
};

export type GetPricingStepData = {
  roomTypeeTitle: string;
  roomTypeId?: number;
  price: number;
  priceListId: number;
  id: number;
  // Todo[Atefeh]: delete if not needed in the future
  // AssociationSchedulingType_title: string;
  // AssociationAcademicSemester_title: string;
  AssociationPriceList_AssociationSchedulingType_title: string;
  AssociationPriceList_AssociationAcademicSemester_title: string;
};
export type GetPricingStepResponse = BPMS_API_RESPONSE<GetPricingStepData[]>;

export type GetCreatePricingStep = {
  AssociationRoomTypee_id: number;
  AssociationRoomTypee_title: string;
  AssociationFloor_AssociationBuilding_dormitoryId: number;
  id: number;
};
export type GetCreatePricingStepResponse = BPMS_API_RESPONSE<GetCreatePricingStep[]>;
export type GetCreatePricingStepRequest = {
  AssociationFloor_AssociationBuilding_dormitoryId_EQ: number;
};

export type SendCreateTariffResponse = BPMS_API_RESPONSE<null>;
export type SendCreateTariffRequest = {
  form: string;
  data: {
    id?: string;
    title: string;
    branchId: number;
    dormitoryId: string;
    currencyTypeId: string;
    tax: number;
    toll: number;
    description: string;
    appliedStartDate: string;
    appliedStartTime?: string;
    appliedEndDate: string;
    appliedEndTime?: string;
    AssociationRoomTypePrice: {
      roomTypeId: number;
      price: string;
    }[];
    descRequest: string;
    schedulingId: string;
    SemesterId: string;
  };
};
