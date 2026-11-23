import { FormInstance } from "antd";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type EstelamAmozeshyarRejectDrawerContentFormType = {
  description: string;
  rejectReason: SelectType<IdTitleName>;
};

export type EstelamAmozeshyarRejectDrawerContentProps = {
  closeDrawerHandler: () => void;
  rejectRequestHandler: () => void;
  form: FormInstance<EstelamAmozeshyarRejectDrawerContentFormType>;
};

//! APIs
export type GetEstelamAmozeshyarRejectReasonsResponse = {
  id: number;
  name: string;
  reason: string;
}[];
