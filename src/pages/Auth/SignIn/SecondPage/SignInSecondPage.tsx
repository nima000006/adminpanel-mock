import { useEffect, useState } from "react";

import { Form } from "antd";
import { PiArrowRight, PiFingerprint, PiSignInLight, PiUserPlus } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  REGISTER_FIRST_PAGE_ROUTE,
  SIGN_IN_FIFTH_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
  SIGN_IN_THIRD_PAGE_ROUTE,
} from "@infra/router/routes/public";
import {
  getFromLocalStorage,
  removeFromStorage,
  setLocalStorage,
} from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import {
  useSignInFirstPageMutation,
  useSignInSecondPageMutation,
} from "@infra/states/redux/Apis/auth/signInApis";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthOtpSection from "@pages/Auth/_shared/components/AuthOtpSection/AuthOtpSection";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";
import useRedirectIfStepInvalid from "@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid";

import { AuthSignInSecondStepResponse, FormType } from "./@types/@signInSecondPage";
import "./_signInSecondPage.scss";

const SignInSecondPage = () => {
  const [countdownKey, setCountdownKey] = useState(0);
  const [tempUser, setTempUser] = useState(() => {
    return JSON.parse(getFromLocalStorage("tempUser") || "{}");
  });
  const [expired, setExpired] = useState(false);

  const [form] = Form.useForm<FormType>();

  const navigate = useNavigate();
  const {
    params: { mobileNumber },
  } = useQueryParams();

  useRedirectIfStepInvalid(2, SIGN_IN_FIRST_PAGE_ROUTE);
  //? ================================  Api Calls ================================
  const [checkOtpSecondPage, { isLoading: isCheckOtpSecondPageLoading }] =
    useSignInSecondPageMutation();
  const [resendOtp, { isLoading: isResetLoading }] = useSignInFirstPageMutation();

  //? ================================  Effects  ================================
  useEffect(() => {
    const savedUser = JSON.parse(getFromLocalStorage("tempUser") || "{}");
    if (savedUser?.userName && savedUser?.password) {
      setTempUser(savedUser);
    }
  }, []);

  //* ================================ Util Functions ================================

  const handleResend = () => {
    const username = tempUser.userName;
    const password = tempUser.password;
    if (!username || !password) return;

    resendOtp({ username, password })
      .unwrap()
      .then(() => {
        setCountdownKey((prev) => prev + 1);
        setExpired(false);
        setLocalStorage("currentPage", "3");
      });
  };

  // submit
  const signinHandler = (values: FormType) => {
    checkOtpSecondPage({ otpCode: values?.otp })
      .unwrap()
      .then(checkOtpSecondPageIsSuccess);
  };

  // send automatically request to backend after fill all digits
  const sendAutomaticallyHandler = () => {
    form.validateFields().then((value) => {
      checkOtpSecondPage({ otpCode: value?.otp })
        .unwrap()
        .then(checkOtpSecondPageIsSuccess);
    });
  };

  //success
  const checkOtpSecondPageIsSuccess = (response: AuthSignInSecondStepResponse) => {
    removeFromStorage("tempInfo");
    removeFromStorage("tempUser");
    if (response?.accessToken?.access_token && response?.accessToken?.refresh_token) {
      setLocalStorage("mainToken", response?.accessToken?.access_token);
      setLocalStorage("mainRefreshToken", response?.accessToken?.refresh_token);

      if (response?.hasEmail) {
        navigate(SIGN_IN_FIFTH_PAGE_ROUTE);
        setLocalStorage("currentPage", "5");
      } else {
        navigate(SIGN_IN_THIRD_PAGE_ROUTE);
        setLocalStorage("currentPage", "3");
      }
    }
  };

  // back handler
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
      <div className="signin-auth-second-page-container">
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
            name="otp"
            title=" جهت احراز شماره همراه، یک کد 4 رقمی به شماره موبایل زیر ارسال گردید"
            subTitle={mobileNumber}
            isMobile={true}
            onResend={handleResend}
            isExpired={expired}
            onFinish={handleTimerFinish}
            countdownKey={countdownKey}
            isSubmitting={isCheckOtpSecondPageLoading}
            isResetLoading={isResetLoading}
            sendAutomaticallyHandler={sendAutomaticallyHandler}
          />
          <div className="btn-wrapper">
            <CustomButton
              type="primary"
              icon={<PiSignInLight size={16} />}
              iconPlacement="end"
              htmlType="submit"
              loading={isCheckOtpSecondPageLoading}
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

export default SignInSecondPage;
