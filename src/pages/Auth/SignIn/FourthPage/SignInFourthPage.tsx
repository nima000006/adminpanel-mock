import { useState } from "react";

import { Form } from "antd";
import { PiArrowRight, PiFingerprint, PiSignInLight, PiUserPlus } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  REGISTER_FIRST_PAGE_ROUTE,
  SIGN_IN_FIFTH_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import { setLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import {
  useSignInFourthPageMutation,
  useSignInThirdPageMutation,
} from "@infra/states/redux/Apis/auth/signInApis";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthOtpSection from "@pages/Auth/_shared/components/AuthOtpSection/AuthOtpSection";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";
import useRedirectIfStepInvalid from "@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid";

import { FormType } from "./@types/@signInFourthPage";
import "./_signInFourthPage.scss";

const SignInFourth = () => {
  const [countdownKey, setCountdownKey] = useState(0);
  const [expired, setExpired] = useState(false);
  const [form] = Form.useForm<FormType>();
  const navigate = useNavigate();
  const {
    params: { email },
  } = useQueryParams();
  useRedirectIfStepInvalid(4, SIGN_IN_FIRST_PAGE_ROUTE);

  //? ================================  Api Calls ================================
  const [sendOtpEmail, { isLoading: isSendOtpEmailLoading }] =
    useSignInFourthPageMutation();

  const [resendOtpEmail, { isLoading: isResendOtpEmailLoading }] =
    useSignInThirdPageMutation();

  //* ================================ Util Functions ================================

  const resendHandler = async () => {
    if (!email) return;

    await resendOtpEmail({
      email,
    }).unwrap();

    setCountdownKey((prev) => prev + 1);
    setExpired(false);
  };

  const signinHandler = (values: FormType) => {
    sendOtpEmail({ email: email, otpCode: values?.otp })
      .unwrap()
      .then(sendOtpEmailIsSuccess);
  };

  const sendOtpEmailIsSuccess = () => {
    navigate(SIGN_IN_FIFTH_PAGE_ROUTE);
    setLocalStorage("currentPage", "5");
  };

  const backHandler = () => {
    navigate(SIGN_IN_FIRST_PAGE_ROUTE);
  };

  const handleTimerFinish = () => {
    setExpired(true);
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <AuthLayout
      bannerLeftSide={
        <LeftSideBannerItem
          icon={PiUserPlus}
          linkLabel="ایجاد حساب"
          to={REGISTER_FIRST_PAGE_ROUTE}
        />
      }
    >
      <div className="signin-auth-fourth-page-container">
        <div className="signin-auth-title-wrapper">
          <AuthTitle icon={PiFingerprint} label="ورود" />
        </div>
        <Form
          form={form}
          onFinish={signinHandler}
          className="auth-signin-form-content-container"
        >
          <AuthOtpSection
            form={form}
            name={"otp"}
            title={" جهت احراز ایمیل شما، یک کد 4 رقمی به ایمیل زیر ارسال گردید"}
            subTitle={email}
            isEmail={true}
            isExpired={expired}
            countdownKey={countdownKey}
            onFinish={handleTimerFinish}
            isSubmitting={isSendOtpEmailLoading}
            isResetLoading={isResendOtpEmailLoading}
            onResend={resendHandler}
          />
          <div className="btn-wrapper">
            <CustomButton
              type="primary"
              icon={<PiSignInLight size={16} />}
              iconPlacement="end"
              htmlType="submit"
              loading={isSendOtpEmailLoading}
              className="signin-panel-btn"
            >
              ورود به پنل
            </CustomButton>
            <CustomButton
              type="primary"
              ghost
              onClick={backHandler}
              icon={<PiArrowRight size={16} />}
              iconPlacement="start"
              className="back-panel-btn"
            >
              بازگشت
            </CustomButton>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default SignInFourth;
