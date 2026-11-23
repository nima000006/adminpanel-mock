import { Form } from "antd";
import {
  PiArrowRight,
  PiAt,
  PiFingerprint,
  PiSignInLight,
  PiUserPlus,
} from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { makeSearchParams } from "@infra/helpers/utils";
import {
  REGISTER_FIRST_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
  SIGN_IN_FOURTH_PAGE_ROUTE,
} from "@infra/router/routes/public";
import { setLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useSignInThirdPageMutation } from "@infra/states/redux/Apis/auth/signInApis";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";
import useRedirectIfStepInvalid from "@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid";

import { FormType } from "./@types/@signThirdPage";
import "./_signThirdPage.scss";

const SignThirdPage = () => {
  const [form] = Form.useForm<FormType>();
  const navigate = useNavigate();
  useRedirectIfStepInvalid(3, SIGN_IN_FIRST_PAGE_ROUTE);
  //? ================================  Api Calls ================================
  const [sendEmail, { isLoading: isSendEmailLoading }] = useSignInThirdPageMutation();

  //* ================================ Util Functions ================================
  const signinHandler = (values: FormType) => {
    sendEmail({ email: values?.email })
      .unwrap()
      .then(() => signinHandlerIsSuccess(values));
  };

  const signinHandlerIsSuccess = (values: FormType) => {
    navigate({
      pathname: SIGN_IN_FOURTH_PAGE_ROUTE,
      search: makeSearchParams({
        email: values?.email,
      }),
    });
    setLocalStorage("currentPage", "4");
  };

  const backHandler = () => {
    navigate(SIGN_IN_FIRST_PAGE_ROUTE);
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
      <div className="signin-auth-third-page-container">
        <div className="signin-auth-title-wrapper">
          <AuthTitle icon={PiFingerprint} label="ورود" />
        </div>
        <Form
          form={form}
          onFinish={signinHandler}
          className="auth-signin-form-content-container"
        >
          <CustomInput
            prefix={<PiAt />}
            type="text"
            label="ایمیل"
            name="email"
            placeholder="ایمیل خود را وارد نمایید."
            disabled={isSendEmailLoading}
          />
          <div className="btn-wrapper">
            <CustomButton
              type="primary"
              icon={<PiSignInLight size={16} />}
              iconPlacement="end"
              htmlType="submit"
              loading={isSendEmailLoading}
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

export default SignThirdPage;
