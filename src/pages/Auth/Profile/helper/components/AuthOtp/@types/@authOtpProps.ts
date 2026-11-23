import { FormInstance } from "antd";

import { FormTypeModal } from "@pages/Auth/Profile/@types/@profile";

export type AuthOtpProps = {
  subTitle: string | number;
  setIsExpired?: (v: boolean) => void;
  onFinish: () => void;
  title: string;
  isExpired: boolean;
  onResend?: () => void;
  form: FormInstance<FormTypeModal>;
  countdownKey?: number;
  name: string;
  deadLine?: number;
};
