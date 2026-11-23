import { FormInstance } from "antd";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyEstelamInfoProps = {
  tab: string;
};

export type MyEstelamRejectDrawerContentFormType = {
  description: string;
  rejectReason: SelectType<IdTitleName>;
};

export type MyEstelamRejectDrawerContentProps = {
  form: FormInstance<MyEstelamRejectDrawerContentFormType>;
  closeDrawerHandler: () => void;
};
