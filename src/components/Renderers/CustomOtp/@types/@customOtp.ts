import { GetProps } from "antd";
import FormItem from "antd/es/form/FormItem";
import OTP from "antd/es/input/OTP";

export type CustomOTPProps = GetProps<typeof OTP> &
  GetProps<typeof FormItem> & { hasVerticalLabel?: boolean };
