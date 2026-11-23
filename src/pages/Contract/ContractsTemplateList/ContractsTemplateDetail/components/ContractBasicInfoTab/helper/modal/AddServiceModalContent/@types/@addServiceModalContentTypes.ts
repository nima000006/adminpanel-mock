import { FormInstance } from "antd";

import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetContractTemplateDetailResponse } from "@pages/Contract/ContractsTemplateList/ContractsTemplateDetail/@types/@contractsTemplateDetail";

export type AddServiceModalContentFormType = {
  services: {
    label: string;
    value: string;
    key: number;
    code: number;
    children: string;
    item: IdTitle;
  };
};

export type AddServiceModalContentProps = {
  form: FormInstance<AddServiceModalContentFormType>;
  data: GetContractTemplateDetailResponse | undefined;
};

export type GetInfoServiceResponse = IdTitleName[];
