import { FormInstance } from "antd";

import { CreateBusinessStepFormType } from "../../../@types/@createBusinessTypes";

export type BusinessInfoGenuineProps = {
  form: FormInstance<CreateBusinessStepFormType>;
  taxTypeData: GetTaxTypeResponse | undefined;
  loading: boolean;
};

export type GetTaxTypeResponse = {
  id: number;
  title: string;
}[];

export type CreateBusinessGenuineStepResponse = { businessTempId: number };
export type CreateBusinessGenuineStepRequest = {
  taxTypeId: number | undefined;
  economicNumberNatural: string | undefined;
  taxTrackingNumberNatural: string | undefined;
  licenceNumber: string;
  title: string | undefined;
  tradeTitle: string | undefined;
  description: string;
  mandatoryFileId?: string | null;
  secondFileId?: string | null;
  thirdFileId?: string | null;
  fourthFileId?: string | null;
  fifthFileId?: string | null;
};
