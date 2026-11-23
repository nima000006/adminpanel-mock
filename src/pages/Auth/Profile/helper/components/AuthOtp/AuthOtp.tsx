import { useEffect, useState } from "react";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomOTP from "@components/Renderers/CustomOtp/CustomOtp";
import { CUSTOM_REQUIRED_RULE } from "@infra/validation/validationSchema";
import AuthTimer from "@pages/Auth/_shared/components/AuthTimer/AuthTimer";

import { AuthOtpProps } from "./@types/@authOtpProps";
import "./_authOtp.scss";

const AuthOtp = ({
  subTitle,
  setIsExpired,
  onFinish,
  title,
  isExpired,
  onResend,
  form,
  countdownKey,
  name,
  deadLine = 40_000,
}: AuthOtpProps) => {
  const [deadline, setDeadline] = useState(Date.now() + 180_000);

  useEffect(() => {
    setDeadline(Date.now() + deadLine);
    setIsExpired?.(false);
  }, [countdownKey, setIsExpired]);

  //* ================================ Util Functions ================================

  const handleInputChange = (value: string[]) => {
    const otp = value.join("");
    form.setFieldsValue({ otp });
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="auth-otp-container">
      <h2 className="auth-otp-title">{title}</h2>
      {subTitle && <h3 className="auth-otp-sub-title">{subTitle}</h3>}
      {/* <AuthOtpInput className="custom-otp" isExpired={isExpired} form={form} name={name} /> */}
      <div className={`otp-container`}>
        <CustomOTP
          name={name}
          length={4}
          className="text-primary-100"
          autoFocus
          inputMode="tel"
          style={{ direction: "ltr" }}
          onInput={handleInputChange}
          disabled={isExpired}
          rules={[CUSTOM_REQUIRED_RULE("")]}
        />
      </div>
      <AuthTimer
        className="custom-hours"
        deadline={deadline}
        onFinish={() => {
          setIsExpired?.(true);
          onFinish?.();
        }}
      />

      {isExpired && (
        <>
          <p className="auth-otp-wrong-number-warn">کدی دریافت نکردید؟</p>
          <CustomButton
            type="link"
            onClick={onResend}
            className="auth-otp-change-number-link"
            //   loading={isResetLoading}
          >
            ارسال مجدد
          </CustomButton>
        </>
      )}
    </div>
  );
};
export default AuthOtp;
