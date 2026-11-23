import { useState } from "react";

import { Steps } from "antd";
import { PiDeviceMobileSpeakerLight } from "react-icons/pi";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { useChangeMobileNumberMutation } from "@infra/states/redux/Apis/auth/profileApis";
import { NUMBER_RULE, REQUIRED_RULE } from "@infra/validation/validationSchema";

import { SubmitMobileModalContentProps } from "./@types/@submitMobileModalContentProps";
import AuthOtp from "../../../components/AuthOtp/AuthOtp";
import "./_submitMobileModalContent.scss";

const SubmitMobileModalContent = ({ current, form }: SubmitMobileModalContentProps) => {
  const [expired, setIsExpired] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);

  //? ================================  Api Calls ================================
  const [resendOtp] = useChangeMobileNumberMutation();

  //* ================================ Util Functions ================================

  const handleTimerFinish = () => {
    setIsExpired(true);
  };

  const mobileNumber = form.getFieldValue("mobile");

  const handleResend = () => {
    resendOtp({ mobileNumber })
      .unwrap()
      .then(() => {
        setCountdownKey((prev) => prev + 1);
        setIsExpired(false);
      });
  };

  const steps = [
    {
      title: "شماره همراه جدید",
      content: (
        <CustomInput
          type="text"
          label="شماره همراه جدید"
          name="mobile"
          placeholder="لطفا شماره همراه خود را وارد نمایید."
          prefix={<PiDeviceMobileSpeakerLight />}
          rules={[REQUIRED_RULE, NUMBER_RULE]}
        />
      ),
    },

    {
      title: "احراز شماره همراه",
      content: (
        <AuthOtp
          form={form}
          name="otp"
          title={
            "جهت احراز شماره موبایل شما یک کد 4 رقمی به شماره موبایل زیر ارسال گردید"
          }
          subTitle={mobileNumber}
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

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="submit-email-modal-content-container">
      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
    </div>
  );
};
export default SubmitMobileModalContent;
