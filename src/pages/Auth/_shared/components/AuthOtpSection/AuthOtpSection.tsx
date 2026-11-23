import { useEffect, useState } from "react";

import { FormInstance } from "antd";
import { Link } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { CHANGE_NUMBER_FIRST_PAGE_ROUTE } from "@infra/router/routes/public";

import AuthOtpInput from "../AuthOtpInput/AuthOtpInput";
import AuthTimer from "../AuthTimer/AuthTimer";
import "./_authOtpSection.scss";

const AuthOtpSection = ({
  title,
  subTitle,
  form,
  isMobile,
  isEmail,
  onResend,
  isExpired,
  countdownKey,
  setIsExpired,
  onFinish,
  isResetLoading,
  name,
  isSubmitting,
  sendAutomaticallyHandler,
}: {
  form: FormInstance;
  title: string;
  subTitle: string;
  isMobile?: boolean;
  isEmail?: boolean;
  onResend?: () => void;
  isExpired: boolean;
  countdownKey?: number;
  setIsExpired?: (v: boolean) => void;
  onFinish: () => void;
  isResetLoading?: boolean;
  name: string;
  isSubmitting?: boolean;
  sendAutomaticallyHandler?: () => void;
}) => {
  const [deadline, setDeadline] = useState(Date.now() + 180_000);

  useEffect(() => {
    setDeadline(Date.now() + 180_000);
    setIsExpired?.(false);
  }, [countdownKey, setIsExpired]);
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <div className="auth-otp-container">
      <h2 className="auth-otp-title">{title}</h2>
      {subTitle && <h3 className="auth-otp-sub-title">{subTitle}</h3>}
      <AuthOtpInput
        className="custom-otp"
        isExpired={isExpired}
        form={form}
        name={name}
        isSubmitting={isSubmitting}
        sendAutomaticallyHandler={sendAutomaticallyHandler}
      />
      <AuthTimer
        className="custom-hours"
        deadline={deadline}
        onFinish={() => {
          setIsExpired?.(true);
          onFinish?.();
        }}
      />
      {isMobile && (
        <div>
          <p className="auth-otp-wrong-number-warn">شماره همراه اشتباه است؟</p>
          <Link
            className="auth-otp-change-number-link"
            to={CHANGE_NUMBER_FIRST_PAGE_ROUTE}
          >
            تغییر شماره همراه
          </Link>
          {isExpired && (
            <>
              <p className="auth-otp-wrong-number-warn">کدی دریافت نکردید؟</p>
              <CustomButton
                type="link"
                onClick={onResend}
                className="auth-otp-change-number-link"
                loading={isResetLoading}
              >
                ارسال مجدد
              </CustomButton>
            </>
          )}
        </div>
      )}
      {isEmail && (
        <div>
          {isExpired && (
            <>
              <p className="auth-otp-wrong-number-warn">کدی دریافت نکردید؟</p>
              <CustomButton
                type="link"
                onClick={onResend}
                className="auth-otp-change-number-link"
                loading={isResetLoading}
              >
                ارسال مجدد
              </CustomButton>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AuthOtpSection;
