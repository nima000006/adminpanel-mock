import { FormInstance } from "antd";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type EstelamSajedRejectDrawerContentFormType = {
  description: string;
  rejectReason: SelectType<IdTitleName>;
};

export type EstelamSajedRejectDrawerContentProps = {
  rejectRequestHandler: () => void;
  form: FormInstance<EstelamSajedRejectDrawerContentFormType>;
  closeDrawerHandler: () => void;
};
