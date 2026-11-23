import { FormInstance } from "antd";

import { BPMS_API_RESPONSE } from "@infra/states/redux/Apis/models/committeeApi.model";
import { DormTariffModifyFormType } from "@pages/Dorm/Planning/Tariff/TariffModify/@types/@tariffModifyType";

//! LAYOUT
export type BasicInfoStepPropsType = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<DormTariffModifyFormType>;
  type?: number;
  setIsLastDormId?: any;
};
export type PricingStepPropsType = {
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  form: FormInstance<DormTariffModifyFormType>;
  type?: number;
  isReject: boolean;
  lastDormId?: number;
};

//! APIS
type IdTitle = {
  title: string;
  id: number;
};
export type GetAllDormitoryData = {
  branchId: number;
  id: number;
  title: string;
};
export type GetAllDormitoryResponse = BPMS_API_RESPONSE<GetAllDormitoryData[]>;
export type GetAllDormitoryRequest = {
  maxResults: number;
  firstResult: number;
};

export type GetAllCurrencyData = IdTitle;
export type GetAllCurrencyResponse = BPMS_API_RESPONSE<GetAllCurrencyData[]>;
export type GetAllCurrencyRequest = { maxResults: number; firstResult: number };

export type GetTariffBasicInfoStepData = {
  appliedStartTime: string;
  appliedEndDate: string;
  appliedStartDate: string;
  description: string;
  tax: number;
  AssociationCurrencyId: IdTitle;
  id: number;
  appliedEndTime: string;
  title: string;
  toll: number;
  AssociationBranchid: IdTitle;
  AssociationDormitory: IdTitle;
};
export type GetTariffBasicInfoStepResponse =
  BPMS_API_RESPONSE<GetTariffBasicInfoStepData>;
export type GetTariffBasicInfoStepRequest = {
  body: {
    _data_: {
      id: string;
    };
  };
  params: { relation: string };
};
