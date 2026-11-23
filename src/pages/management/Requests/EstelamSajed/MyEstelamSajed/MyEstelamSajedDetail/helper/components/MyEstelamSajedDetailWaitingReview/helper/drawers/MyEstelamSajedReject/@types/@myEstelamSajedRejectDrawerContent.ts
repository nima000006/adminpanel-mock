import { FormInstance } from "antd";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyEstelamSajedRejectDrawerContentFormType = {
  description: string;
  rejectReason: SelectType<IdTitleName>;
};

export type MyEstelamSajedRejectDrawerContentProps = {
  rejectRequestHandler: () => void;
  form: FormInstance<MyEstelamSajedRejectDrawerContentFormType>;
  closeDrawerHandler: () => void;
};
