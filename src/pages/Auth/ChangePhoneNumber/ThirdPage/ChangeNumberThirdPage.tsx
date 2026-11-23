import { useEffect, useState } from "react";

import { Form } from "antd";
import { PiArrowRight, PiArrowsClockwiseBold, PiUserPlus } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import useQueryParams from "@infra/hooks/useQueryParams";
import {
  CHANGE_NUMBER_FIRST_PAGE_ROUTE,
  REGISTER_FIRST_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import { removeFromStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import {
  useChangeNumberSecondPageMutation,
  useChangeNumberThirdPageMutation,
} from "@infra/states/redux/Apis/auth/changeNumberApis";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthOtpSection from "@pages/Auth/_shared/components/AuthOtpSection/AuthOtpSection";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";
import useRedirectIfStepInvalid from "@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid";

import { ChangeNumberThirdPageFormType } from "./@types/@changeNumberThirdPage.scss";
import "./_changeNumberThirdPage.scss";

const ChangeNumberThirdPage = () => {
  const [countdownKey, setCountdownKey] = useState(0);
  const [expired, setExpired] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm<ChangeNumberThirdPageFormType>();
  const {
    params: { mobile },
  } = useQueryParams();
  useRedirectIfStepInvalid(3, CHANGE_NUMBER_FIRST_PAGE_ROUTE);
  const [mobileNumber, setMobileNumber] = useState<string>("");

  //? ================================  Api Calls ================================
  const [checkOtpSecondPage, { isLoading: isCheckOtpSecondPageLoading }] =
    useChangeNumberThirdPageMutation();

  const [resendOtp, { isLoading: isResetLoading }] = useChangeNumberSecondPageMutation();
  //? ================================   Effects ================================
  useEffect(() => {
    if (mobile) {
      setMobileNumber(mobile);
    }
  }, [mobile]);
  //* ================================ Util Functions ================================
  const handleResend = () => {
    if (!mobileNumber) return;

    resendOtp({ mobileNumber })
      .unwrap()
      .then(() => {
        setCountdownKey((prev) => prev + 1);
        setExpired(false);
      });
  };

  const handleTimerFinish = () => {
    setExpired(true);
  };

  const registerHandler = (values: ChangeNumberThirdPageFormType) => {
    checkOtpSecondPage({ otpCode: values?.otp })
      .unwrap()
      .then(checkOtpSecondPageIsSuccess);
  };

  //success
  const checkOtpSecondPageIsSuccess = () => {
    navigate(SIGN_IN_FIRST_PAGE_ROUTE);
    removeFromStorage("currentPage");
    removeFromStorage("tempInfo");
  };

  const backHandler = () => {
    navigate(CHANGE_NUMBER_FIRST_PAGE_ROUTE);
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
      <div className="auth-change-number-third-page-container">
        <div className="change-number-title-wrapper">
          <AuthTitle icon={PiArrowsClockwiseBold} label="تغییر شماره همراه" />
          <AuthStepper itemCount={3} currentStep={3} />
        </div>
        <Form
          form={form}
          onFinish={registerHandler}
          className="change-number-form-content-container"
        >
          <AuthOtpSection
            form={form}
            name="otp"
            title="جهت احراز شماره همراه، یک کد 4 رقمی به شماره موبایل زیر ارسال گردید"
            subTitle={mobile}
            isMobile={true}
            onResend={handleResend}
            isExpired={expired}
            onFinish={handleTimerFinish}
            countdownKey={countdownKey}
            isResetLoading={isResetLoading}
            isSubmitting={isCheckOtpSecondPageLoading}
          />
          <div className="btn-wrapper">
            <CustomButton
              type="primary"
              htmlType="submit"
              loading={isCheckOtpSecondPageLoading}
            >
              ثبت و ادامه
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

export default ChangeNumberThirdPage;
