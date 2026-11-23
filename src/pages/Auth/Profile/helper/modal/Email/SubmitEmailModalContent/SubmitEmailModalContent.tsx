import { useState } from "react";

import { Steps } from "antd";
import { PiAt } from "react-icons/pi";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { useSendEmailMutation } from "@infra/states/redux/Apis/auth/profileApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { SubmitEmailModalContentProps } from "./@types/@submitEmailModalContent";
import AuthOtp from "../../../components/AuthOtp/AuthOtp";

import "./_submitEmailModalContent.scss";

const SubmitEmailModalContent = ({ current, form }: SubmitEmailModalContentProps) => {
  const [expired, setIsExpired] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);

  const email = form.getFieldValue("email");

  //? ================================  Api Calls ================================
  const [resendOtp] = useSendEmailMutation();

  //* ================================ Util Functions ================================

  const handleTimerFinish = () => {
    setIsExpired(true);
  };

  const handleResend = () => {
    const email = form.getFieldValue("email");

    resendOtp({ email })
      .unwrap()
      .then(() => {
        setCountdownKey((prev) => prev + 1);
        setIsExpired(false);
      })
      .catch((err) => {
        console.error("Resend OTP failed", err);
      });
  };

  const steps = [
    {
      title: "ثبت ایمیل",
      content: (
        <CustomInput
          type="text"
          label="ایمیل"
          name="email"
          placeholder="لطفا ایمیل خود را وارد نمایید."
          prefix={<PiAt />}
          rules={[REQUIRED_RULE]}
        />
      ),
    },

    {
      title: "تایید ایمیل",
      content: (
        <AuthOtp
          form={form}
          name="otp"
          title={"جهت احراز ایمیل شما، یک کد 4 رقمی به ایمیل زیر ارسال گردید"}
          subTitle={email ? email : "-"}
          isExpired={expired}
          setIsExpired={setIsExpired}
          onFinish={handleTimerFinish}
          countdownKey={countdownKey}
          onResend={handleResend}
          deadLine={180_000}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  return (
    <div className="submit-mobile-modal-content-container">
      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
    </div>
  );
};
export default SubmitEmailModalContent;
