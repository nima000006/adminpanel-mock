import { FormInstance } from "antd";

export type ShopAllVendorsDetailBaseInfoEditShippingFormType = {
  tehranShippingCost?: number | null;
  tehranMinShippingDays?: number | null;
  tehranMaxShippingDays?: number | null;
  otherCitiesShippingCost?: number | null;
  otherCitiesMinShippingDays?: number | null;
  otherCitiesMaxShippingDays?: number | null;
};

export type ShopAllVendorsDetailBaseInfoEditShippingModalContentProps = {
  form: FormInstance<ShopAllVendorsDetailBaseInfoEditShippingFormType>;
};
