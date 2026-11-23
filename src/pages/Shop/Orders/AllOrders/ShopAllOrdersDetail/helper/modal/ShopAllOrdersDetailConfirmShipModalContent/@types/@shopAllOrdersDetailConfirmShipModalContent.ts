import { FormInstance } from "antd";

export type ShopAllOrdersDetailConfirmShipFormType = {
  shippingDescription?: string;
};

export type ShopAllOrdersDetailConfirmShipModalContentProps = {
  form: FormInstance<ShopAllOrdersDetailConfirmShipFormType>;
};
