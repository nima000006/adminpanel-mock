import { FormInstance } from "antd";

export type formChangePassword = {
  newPassword: string;
  confirmPassword: string;
  password: string;
};
export type SubmitChangePasswordModalContentProps = {
  current: number;
  form: FormInstance<formChangePassword>;
  onPasswordRulesPassed: (passValue: boolean) => void;
};

export type ChangePasswordStepProps = {
  showPassword: boolean;
  setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
  form: FormInstance<formChangePassword>;
  onPasswordRulesPassed: (passValue: boolean) => void;
};
