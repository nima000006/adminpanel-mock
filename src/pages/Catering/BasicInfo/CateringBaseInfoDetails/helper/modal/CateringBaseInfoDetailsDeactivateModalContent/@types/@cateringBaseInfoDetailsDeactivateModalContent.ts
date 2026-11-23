import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { CateringBaseInfoDetailsRecord } from "@pages/Catering/BasicInfo/CateringBaseInfoDetails/@types/@foodBaseInfoDetails";

export type CateringBaseInfoDetailsDeactivateModalFormData = {
  deactivateReason?: SelectType<IdTitle>;
};

export type CateringBaseInfoDetailsDeactivateModalContentProps = {
  form: FormInstance<CateringBaseInfoDetailsDeactivateModalFormData>;
  record: CateringBaseInfoDetailsRecord | null;
  productCategoryTitle: string;
};
