import { useEffect, useState } from "react";

import { Form, FormInstance } from "antd";

import { CustomButton } from "@components/CustomInputs";
import CustomOTP from "@components/Renderers/CustomOtp/CustomOtp";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AuthTimer from "@pages/Auth/_shared/components/AuthTimer/AuthTimer";

const MyWalletDetailsWithdrawWalletOtpStep = ({
  otpForm,
  tempToken,
  onResend,
  isResetLoading,
}: {
  otpForm: FormInstance<{ otp: string }>;
  tempToken: { token: string | null; mobileNo: string | null };
  onResend: () => Promise<void>;
  isResetLoading: boolean;
}) => {
  const [expired, setIsExpired] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);

  const [deadline, setDeadline] = useState(Date.now() + 180_000);

  //? ================================ Effects ================================
  useEffect(() => {
    setDeadline(Date.now() + 180_000);
    setIsExpired?.(false);
  }, [countdownKey, setIsExpired]);

  //* ================================ Util Functions ================================

  const handleTimerFinish = () => {
    setIsExpired(true);
  };

  const handleResend = () => {
    onResend().then(() => {
      setCountdownKey((prev) => prev + 1);
      setIsExpired(false);
    });
  };

  const handleInputChange = (value: string[]) => {
    const otp = value.join("");
    otpForm.setFieldsValue({ otp });
  };

  return (
    <Form className="mt-10! flex flex-col gap-5" form={otpForm}>
      <p className="font-medium">کد تایید تسویه حساب</p>
      <div className="flex flex-col items-center gap-5">
        <p className="font-medium">
          کد 4 رقمی ارسال‌شده به{" "}
          <span dir="ltr">{dataPlaceHolder({ data: tempToken?.mobileNo })}</span> را وارد
          کنید.
        </p>
        <CustomOTP
          name="otp"
          length={4}
          className="text-primary-100"
          autoFocus
          inputMode="tel"
          style={{ direction: "ltr" }}
          onInput={handleInputChange}
          disabled={expired}
          rules={[REQUIRED_RULE]}
        />
        <AuthTimer
          className="custom-hours"
          deadline={deadline}
          onFinish={() => {
            setIsExpired?.(true);
            handleTimerFinish();
          }}
        />
        {expired && (
          <CustomButton
            type="link"
            onClick={handleResend}
            className="auth-otp-change-number-link"
            loading={isResetLoading}
          >
            ارسال مجدد
          </CustomButton>
        )}
      </div>
    </Form>
  );
};

export default MyWalletDetailsWithdrawWalletOtpStep;
