import { FormInstance } from "antd";

import {
  IdTitleName,
  SelectType,
} from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllOrdersDetailRejectFormType = {
  rejectReason: SelectType<IdTitleName>;
  rejectDescription?: string;
};

export type ShopAllOrdersDetailRejectModalContentProps = {
  form: FormInstance<ShopAllOrdersDetailRejectFormType>;
};

// APIs
export type GetRejectReasonsListRequest = void;

export type GetRejectReasonsListResponse = IdTitleName[];
