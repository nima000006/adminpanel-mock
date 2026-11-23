import { useState } from "react";

import { Form } from "antd";
import { PiArrowRight, PiFingerprint, PiUserPlus } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  REGISTER_FIRST_PAGE_ROUTE,
  REGISTER_THIRD_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import { setLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import {
  useRegisterStepFirstMutation,
  useRegisterStepSecondMutation,
} from "@infra/states/redux/Apis/auth/registerApis";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthOtpSection from "@pages/Auth/_shared/components/AuthOtpSection/AuthOtpSection";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";
import useRedirectIfStepInvalid from "@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid";

import { SecondFormType } from "../@types/@authRegisterTypes";
import "./_registerSecondPage.scss";

const RegisterSecondPage = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);
  const [form] = Form.useForm<SecondFormType>();
  const navigate = useNavigate();
  const {
    params: { mobileNumber },
  } = useQueryParams<{ mobileNumber: string }>();

  useRedirectIfStepInvalid(2, REGISTER_FIRST_PAGE_ROUTE);
  //? ================================  Api Calls ================================
  const [registerSecondStep, { isLoading: isRegisterSecondStepLoading }] =
    useRegisterStepSecondMutation();
  const [resendOtp, { isLoading: isResetLoading }] = useRegisterStepFirstMutation();
  //* ================================ Util Functions ================================
  const handleResend = () => {
    if (!mobileNumber) return;
    resendOtp({ mobileNumber })
      .unwrap()
      .then((res) => {
        if (res.token) {
          setLocalStorage("tempInfo", res?.token);
        }
        setCountdownKey((prev) => prev + 1);
        setIsExpired(false);
      });
  };

  const handleSubmit = (values: SecondFormType) => {
    registerSecondStep({ otpCode: values?.otp })
      .unwrap()
      .then((res) => {
        if (res.token) {
          setLocalStorage("tempInfo", res?.token);
          navigate(REGISTER_THIRD_PAGE_ROUTE);
          setLocalStorage("currentPage", "3");
        }
      });
  };
  const handleTimerFinish = () => {
    setIsExpired(true);
  };
  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */
  return (
    <AuthLayout
      bannerLeftSide={
        <LeftSideBannerItem
          icon={PiFingerprint}
          linkLabel="ورود به حساب کاربری"
          to={SIGN_IN_FIRST_PAGE_ROUTE}
        />
      }
    >
      <div className="register-auth-second-page-container">
        <Form
          form={form}
          className="register-auth-second-page-form-container"
          onFinish={handleSubmit}
        >
          <div>
            <AuthTitle icon={PiUserPlus} label="ثبت نام" />
            <AuthStepper currentStep={2} itemCount={6} />
          </div>
          <AuthOtpSection
            form={form}
            title="جهت احراز شماره همراه، یک کد 4 رقمی به شماره موبایل زیر ارسال گردید"
            subTitle={mobileNumber}
            isMobile={true}
            isExpired={isExpired}
            setIsExpired={setIsExpired}
            onFinish={handleTimerFinish}
            isResetLoading={isResetLoading}
            onResend={handleResend}
            countdownKey={countdownKey}
            isSubmitting={isRegisterSecondStepLoading}
            name="otp"
          />
          <div className="auth-btn-container">
            <CustomButton
              htmlType="submit"
              type="primary"
              loading={isRegisterSecondStepLoading}
            >
              ثبت و ادامه
            </CustomButton>
            <CustomButton htmlType="submit" type="link">
              <Link className="auth-btn-container-a" to={REGISTER_FIRST_PAGE_ROUTE}>
                <PiArrowRight size={16} /> بازگشت
              </Link>
            </CustomButton>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
};
export default RegisterSecondPage;
