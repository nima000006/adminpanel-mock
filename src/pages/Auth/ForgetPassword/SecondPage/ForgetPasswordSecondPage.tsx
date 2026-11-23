import { useEffect, useState } from "react";

import { Form } from "antd";
import { PiUserPlus, PiFingerprint, PiArrowRight } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import { makeSearchParams } from "@infra/helpers/utils";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  FORGOT_PASSWORD_FIRST_PAGE_ROUTE,
  FORGOT_PASSWORD_THIRD_PAGE_ROUTE,
  REGISTER_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import {
  getFromLocalStorage,
  removeFromStorage,
} from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { setLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import {
  useForgetPasswordSecondMutation,
  useForgetPasswordFirstMutation,
} from "@infra/states/redux/Apis/auth/forgetPasswordApis";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthOtpSection from "@pages/Auth/_shared/components/AuthOtpSection/AuthOtpSection";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import useRedirectIfStepInvalid from "@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid";

import LeftSideBannerItem from "../../_shared/components/LeftSideBannerItem/LeftSideBannerItem";
import { SecondFormType } from "../@types/@authForgetPasswordTypes";
import "./_forgetPasswordSecondPage.scss";

const ForgetPasswordSecondPage = () => {
  const [isExpired, setIsExpired] = useState(false);
  const [countdownKey, setCountdownKey] = useState(0);
  const [savedUsername, setSavedUsername] = useState(
    () => getFromLocalStorage("tempUser") || ""
  );

  const [form] = Form.useForm<SecondFormType>();
  const navigate = useNavigate();
  const {
    params: { mobileNumber },
    setSearchParams,
  } = useQueryParams<{ mobileNumber: string }>();

  useRedirectIfStepInvalid(2, FORGOT_PASSWORD_FIRST_PAGE_ROUTE);

  //? ================================  Api Calls ================================
  const [forgetPassword, { isLoading: isForgetPasswordLoading }] =
    useForgetPasswordSecondMutation();
  const [resendOtp, { isLoading: isResetLoading }] = useForgetPasswordFirstMutation();
  //? ================================  Effects  ================================
  useEffect(() => {
    const user = getFromLocalStorage("tempUser") || "";
    setSavedUsername(user);
  }, []);

  //* ================================ Util Functions ================================
  const handleTimerFinish = () => {
    setIsExpired(true);
  };
  const handleResend = () => {
    if (!savedUsername) return;
    resendOtp({ username: savedUsername })
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
    forgetPassword({ otp: values?.otp })
      .unwrap()
      .then((res) => {
        if (res?.token) {
          setLocalStorage("tempInfo", res.token);
          setSearchParams({
            mobileNumber: mobileNumber,
            email: res.email,
          });
          navigate({
            pathname: FORGOT_PASSWORD_THIRD_PAGE_ROUTE,
            search: makeSearchParams({ email: res?.email }),
          });
          removeFromStorage("tempUser");
          setLocalStorage("currentPage", "3");
        }
      });
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
      <div className="auth-header-second-container">
        <AuthTitle icon={PiFingerprint} label="فراموشی رمز عبور" />
        <AuthStepper itemCount={4} currentStep={2} />

        <Form
          form={form}
          onFinish={handleSubmit}
          className="auth-header-second-form-container"
        >
          <div></div>
          <AuthOtpSection
            form={form}
            name="otp"
            title="جهت احراز شماره همراه، یک کد 4 رقمی به شماره موبایل زیر ارسال گردید"
            subTitle={mobileNumber}
            isMobile={true}
            isExpired={isExpired}
            onResend={handleResend}
            countdownKey={countdownKey}
            setIsExpired={setIsExpired}
            onFinish={handleTimerFinish}
            isResetLoading={isResetLoading}
            isSubmitting={isForgetPasswordLoading}
          />
          <div className="auth-btn-container">
            <CustomButton
              htmlType="submit"
              type="primary"
              loading={isForgetPasswordLoading}
            >
              ثبت و ادامه
            </CustomButton>
            <CustomButton htmlType="submit" type="link">
              <Link
                className="auth-btn-container-a"
                to={FORGOT_PASSWORD_FIRST_PAGE_ROUTE}
              >
                <PiArrowRight size={16} /> بازگشت
              </Link>
            </CustomButton>
          </div>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default ForgetPasswordSecondPage;
