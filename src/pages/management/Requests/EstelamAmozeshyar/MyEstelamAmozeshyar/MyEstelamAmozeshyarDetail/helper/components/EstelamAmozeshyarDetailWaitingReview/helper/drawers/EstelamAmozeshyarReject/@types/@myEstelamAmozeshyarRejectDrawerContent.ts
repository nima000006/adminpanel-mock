import { FormInstance } from "antd";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type MyEstelamAmozeshyarRejectDrawerContentFormType = {
  description: string;
  rejectReason: SelectType<IdTitleName>;
};

export type MyEstelamAmozeshyarRejectDrawerContentProps = {
  closeDrawerHandler: () => void;
  rejectRequestHandler: () => void;
  form: FormInstance<MyEstelamAmozeshyarRejectDrawerContentFormType>;
};

//! APIs
export type GetMyEstelamAmozeshyarRejectReasonsResponse = {
  id: number;
  name: string;
  reason: string;
}[];
