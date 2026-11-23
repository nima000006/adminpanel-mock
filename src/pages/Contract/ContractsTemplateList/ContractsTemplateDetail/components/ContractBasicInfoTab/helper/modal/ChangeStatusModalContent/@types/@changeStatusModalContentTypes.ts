import { FormInstance } from "antd";

import { IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

import { ChangeModalFormType } from "../../../../@types/@contractBasicInfoTabTypes";

export type ChangeStatusModalContentProps = {
  form: FormInstance<ChangeModalFormType>;
};

export type GetReasonChangeStatusResponse = IdTitleName[];
