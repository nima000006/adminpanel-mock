import { useState } from "react";

import { Form } from "antd";
import { PiArrowRight, PiFingerprint, PiUserPlus } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  FORGOT_PASSWORD_FIRST_PAGE_ROUTE,
  FORGOT_PASSWORD_FOURTH_PAGE_ROUTE,
  REGISTER_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import { setLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useForgetPasswordThirdMutation } from "@infra/states/redux/Apis/auth/forgetPasswordApis";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthOtpSection from "@pages/Auth/_shared/components/AuthOtpSection/AuthOtpSection";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import useRedirectIfStepInvalid from "@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid";

import LeftSideBannerItem from "../../_shared/components/LeftSideBannerItem/LeftSideBannerItem";
import { ThirdFormType } from "../@types/@authForgetPasswordTypes";
import "./_forgetPasswordThirdPage.scss";

const ForgetPasswordThirdPage = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [form] = Form.useForm<ThirdFormType>();
  const navigate = useNavigate();
  const {
    params: { email },
  } = useQueryParams<{ email: string }>();

  useRedirectIfStepInvalid(3, FORGOT_PASSWORD_FIRST_PAGE_ROUTE);
  //? ================================  Api Calls ================================
  const [forgetPassword, { isLoading: isForgetPassword }] =
    useForgetPasswordThirdMutation();
  //* ================================ Util Functions ================================
  const handleSubmit = (values: ThirdFormType) => {
    forgetPassword({ otp: values?.otp })
      .unwrap()
      .then((res) => {
        if (res?.token) {
          setLocalStorage("tempInfo", res.token);
          navigate(FORGOT_PASSWORD_FOURTH_PAGE_ROUTE);
          setLocalStorage("currentPage", "4");
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
          icon={PiUserPlus}
          linkLabel="ایجاد حساب"
          to={REGISTER_FIRST_PAGE_ROUTE}
        />
      }
    >
      <div className="auth-header-third-container">
        <AuthTitle icon={PiFingerprint} label="فراموشی رمز عبور" />
        <AuthStepper itemCount={4} currentStep={3} />
      </div>
      <Form
        form={form}
        onFinish={handleSubmit}
        className="auth-header-third-form-container"
      >
        <div></div>
        <AuthOtpSection
          form={form}
          name="otp"
          title=" جهت احراز 2 مرحله‌ای، یک کد 4 رقمی به ایمیل زیر ارسال گردید"
          subTitle={email}
          isMobile={false}
          isExpired={isExpired}
          setIsExpired={setIsExpired}
          onFinish={handleTimerFinish}
          isSubmitting={isForgetPassword}
        />
        <div className="auth-btn-container">
          <CustomButton htmlType="submit" type="primary" loading={isForgetPassword}>
            ثبت و ادامه
          </CustomButton>
          <CustomButton htmlType="submit" type="link">
            <Link className="auth-btn-container-a" to={FORGOT_PASSWORD_FIRST_PAGE_ROUTE}>
              <PiArrowRight size={16} /> بازگشت
            </Link>
          </CustomButton>
        </div>
      </Form>
    </AuthLayout>
  );
};

export default ForgetPasswordThirdPage;
