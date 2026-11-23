import { FormInstance } from "antd";

import { CreateBusinessStepFormType } from "../../../@types/@createBusinessTypes";
import { GetTaxTypeResponse } from "../../BusinessInfoGenuine/@types/@businessInfoGenuineProps";

export type BusinessInfoLegalProps = {
  form: FormInstance<CreateBusinessStepFormType>;
  taxTypeData: GetTaxTypeResponse | undefined;
  loading: boolean;
};

export type CreateBusinessLegalStepResponse = { businessTempId: number };
export type CreateBusinessLegalStepRequest = {
  taxTypeId: number | undefined;
  legalPersonalityGroupTypeId: number | undefined;
  nationalCodeLegal: string | undefined;
  economicNumberLegal: string | undefined;
  taxTrackingNumberLegal: string | undefined;
  businessTitle: string | undefined;
  tradeTitle: string | undefined;
  businessDescription: string;
  mandatoryFileId: string;
  secondFileId: string | null;
  thirdFileId: string | null;
  fourthFileId: string | null;
  fifthFileId: string | null;
};

export type GetPersonalityTypeResponse = {
  id: number;
  title: string;
}[];
