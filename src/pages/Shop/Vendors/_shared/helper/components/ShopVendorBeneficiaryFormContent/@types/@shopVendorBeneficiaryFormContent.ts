import { FormInstance } from "antd";

import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type ShopVendorBeneficiaryFormType = {
  business: SelectType<IdTitle>;
  branch: SelectType<IdTitle>;
};

export type ShopVendorBeneficiaryFormContentProps = {
  form: FormInstance<ShopVendorBeneficiaryFormType>;
  showAlert?: boolean;
};
