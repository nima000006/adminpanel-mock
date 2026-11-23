import { FormInstance } from "antd";

import { IdTitle, IdTitleName } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopAllProductsRequestDetailRejectFormType = {
  rejectReason?: {
    value?: string;
    item?: IdTitle;
  };
  rejectDescription?: string;
};

export type ShopAllProductsRequestDetailRejectModalContentProps = {
  form: FormInstance<ShopAllProductsRequestDetailRejectFormType>;
};

export type GetShopAllProductsRequestRejectReasonsResponse = IdTitleName[];
