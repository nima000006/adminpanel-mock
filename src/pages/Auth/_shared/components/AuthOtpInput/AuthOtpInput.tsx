import { useEffect } from "react";

import { FormInstance } from "antd";

import CustomOTP from "@components/Renderers/CustomOtp/CustomOtp";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";
import "./_authOtpInput.scss";

const AuthOtpInput = ({
  className,
  isExpired,
  form,
  name,
  isSubmitting,
  sendAutomaticallyHandler,
}: {
  className?: string;
  isExpired?: boolean;
  form: FormInstance;
  name: string;
  isSubmitting?: boolean;
  sendAutomaticallyHandler?: () => void;
}) => {
  //?* ================================ Effects  ================================
  useEffect(() => {
    if (isExpired) {
      form.setFieldsValue({ [name]: "" }); // Clear OTP value when expired
    }
  }, [isExpired, form, name]);
  //* ================================ Util Functions ================================

  const handleInputChange = (value: string[]) => {
    const otp = value.join("");
    form.setFieldsValue({ otp });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className={`otp-container ${className || ""}`}>
      <CustomOTP
        name={name}
        length={4}
        className="text-primary-100"
        autoFocus
        inputMode="tel"
        style={{ direction: "ltr" }}
        onInput={handleInputChange}
        disabled={isExpired || isSubmitting}
        rules={[CUSTOM_REQUIRED_RULE("")]}
        {...(sendAutomaticallyHandler ? { onChange: sendAutomaticallyHandler } : {})}
      />
    </div>
  );
};

export default AuthOtpInput;
