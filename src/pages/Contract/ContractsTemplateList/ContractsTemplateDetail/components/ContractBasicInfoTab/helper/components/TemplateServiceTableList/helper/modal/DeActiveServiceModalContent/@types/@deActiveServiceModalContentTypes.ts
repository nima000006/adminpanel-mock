import { FormInstance } from "antd";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type TableChangeModalFormType = {
  changeDate?: string;
  reasonChange: SelectType<IdTitleName>;
  desc: string;
};
export type DeActiveServiceModalContentProps = {
  form: FormInstance<TableChangeModalFormType>;
};
