import { FormInstance } from "antd";

import { UserInquiryStudentNumberResponse } from "@infra/states/redux/Apis/models/authApi.model";
import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type EstelamInfoProps = {
  tab: string;
  data: UserInquiryStudentNumberResponse | null;
};

export type ForeignRejectDrawerContentFormType = {
  description: string;
  rejectReason: SelectType<IdTitleName>;
};

export type ForeignRejectDrawerContentProps = {
  form: FormInstance<ForeignRejectDrawerContentFormType>;
  closeDrawerHandler: () => void;
};

export type RejectAllForeignRequest = {
  id: string;
  params: { rejectReason: string; reason: string };
};
