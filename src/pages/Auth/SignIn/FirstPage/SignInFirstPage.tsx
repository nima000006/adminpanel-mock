import { useEffect, useState } from "react";

import { Checkbox, CheckboxChangeEvent, Form } from "antd";
import {
  PiFingerprint,
  PiPassword,
  PiSignInLight,
  PiUserPlus,
  PiUserThin,
} from "react-icons/pi";
import { useLocation, useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { makeSearchParams } from "@infra/helpers/utils";
import {
  CHANGE_NUMBER_FIRST_PAGE_ROUTE,
  FORGOT_PASSWORD_FIRST_PAGE_ROUTE,
  REGISTER_FIRST_PAGE_ROUTE,
  SIGN_IN_SECOND_PAGE_ROUTE,
} from "@infra/router/routes/public";
import {
  removeFromStorage,
  setLocalStorage,
} from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useSignInFirstPageMutation } from "@infra/states/redux/Apis/auth/signInApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import { WARNING_LOGIN_MESSAGE } from "@infra/VARS/globalToasts/globalToasts";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LabelCard from "@pages/Auth/_shared/components/LabelCard/LabelCard";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";

import { AuthSignInFirstStepResponse, FormType } from "./@types/@firstPageTypes";
import "./_signInFirstPage.scss";

const SignInFirstPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [form] = Form.useForm<FormType>();
  const { search } = useLocation();
  const navigate = useNavigate();
  //? ================================  Api Calls ================================
  const [sendUserName, { isLoading: isSendUserNameLoading }] =
    useSignInFirstPageMutation();

  //? ================================ Effects  ================================
  useEffect(() => {
    if (search === "?reason=logout" || search === "?reason=unauthorized") {
      toast.warning(WARNING_LOGIN_MESSAGE, {
        toastId: WARNING_LOGIN_MESSAGE,
      });
    }
  }, [search]);

  useEffect(() => {
    removeFromStorage("tempInfo");
    setLocalStorage("currentPage", "1");
  }, []);
  //* ================================ Util Functions ================================
  const signinHandler = (value: FormType) => {
    setLocalStorage(
      "tempUser",
      JSON.stringify({
        userName: value?.userName,
        password: value?.password,
      })
    );
    sendUserName({
      username: value?.userName,
      password: value?.password,
    })
      .unwrap()
      .then(sendUserNameIsSuccess);
  };

  const sendUserNameIsSuccess = (res: AuthSignInFirstStepResponse) => {
    if (res?.token) {
      setLocalStorage("tempInfo", res?.token);
      navigate({
        pathname: SIGN_IN_SECOND_PAGE_ROUTE,
        search: makeSearchParams({
          mobileNumber: res?.mobileNumber,
        }),
      });
      setLocalStorage("currentPage", "2");
    }
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setShowPassword(e.target.checked);
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
      <div className="signin-auth-first-page-container">
        <div className="signin-auth-title-wrapper">
          <AuthTitle icon={PiFingerprint} label="ورود" />
        </div>
        <Form
          form={form}
          onFinish={signinHandler}
          className="auth-signin-form-content-container"
        >
          <section>
            <div className="input-wrapper">
              <CustomInput
                prefix={<PiUserThin />}
                type="text"
                label="نام کاربری"
                name="userName"
                placeholder="کد ملی خود را وارد نمایید."
                rules={[REQUIRED_RULE]}
                disabled={isSendUserNameLoading}
              />
              <div className="password-wrapper">
                <CustomInput
                  prefix={<PiPassword />}
                  type={showPassword ? "text" : "password"}
                  label="رمز عبور"
                  name="password"
                  placeholder="رمز عبور خود را وارد نمایید."
                  rules={[REQUIRED_RULE]}
                  disabled={isSendUserNameLoading}
                  autoComplete="current-password"
                />

                <Checkbox onChange={handleCheckboxChange} checked={showPassword}>
                  نمایش رمزعبور
                </Checkbox>
              </div>
            </div>
            <div className="lable-card-section-wrapper">
              <LabelCard
                title="رمز عبورتان را فراموش کرده‌اید؟"
                linkLabel="فراموشی رمز عبور"
                to={FORGOT_PASSWORD_FIRST_PAGE_ROUTE}
              />
              <LabelCard
                title="به شماره همراه خود دسترسی ندارید؟"
                linkLabel="تغییر شماره همراه"
                to={CHANGE_NUMBER_FIRST_PAGE_ROUTE}
              />
            </div>
          </section>

          <CustomButton
            type="primary"
            icon={<PiSignInLight size={16} />}
            iconPlacement="end"
            htmlType="submit"
            loading={isSendUserNameLoading}
            className="signin-panel-btn"
          >
            ورود به پنل
          </CustomButton>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default SignInFirstPage;
