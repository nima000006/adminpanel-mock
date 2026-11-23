import { ReactNode } from "react";

import { FormInstance } from "antd";

type IsFormSensitive = {
  isFormSensitive: true;
  form: FormInstance<any>;
};
type IsNotFormSensitive = {
  isFormSensitive?: false;
  form?: undefined;
};

//!LAYOUT
export type ConfirmationModalWithContentProps = {
  isModalOpen?: boolean;
  onConfirmClickHandler?: () => void;
  closeModalHandler: () => void;
  title?: string;
  isDangerous?: boolean;
  backBtnDanger?: boolean;
  centered?: boolean;
  isConfirmButtonLoading?: boolean;
  isConfirmButtonDisable?: boolean;
  confirmBtnText?: string;
  backBtnText?: string;
  content: ReactNode;
  customClass?: string;
  width?: number;
  htmlType?: "submit" | "button" | "reset" | undefined;
  titleIcon?: ReactNode;
  customActionBar?: ReactNode;
  showIcon?: boolean;
  hasNavigatorButton?: boolean;
  hasCustomActionBar?: boolean;
  iconType?: string;
  onBackBtnHandler?: () => void;
} & (IsFormSensitive | IsNotFormSensitive);
