import { useEffect } from "react";

import { Form } from "antd";
import { PiFingerprint, PiUserPlus, PiUser } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { makeSearchParams } from "@infra/helpers/utils";
import {
  FORGOT_PASSWORD_SECOND_PAGE_ROUTE,
  REGISTER_FIRST_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import {
  removeFromStorage,
  setLocalStorage,
} from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useForgetPasswordFirstMutation } from "@infra/states/redux/Apis/auth/forgetPasswordApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LabelCard from "@pages/Auth/_shared/components/LabelCard/LabelCard";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";

import { FirstFormType } from "../@types/@authForgetPasswordTypes";
import "./_forgetPasswordFirstPage.scss";

const ForgetPasswordFirstPage = () => {
  const [form] = Form.useForm<FirstFormType>();
  const navigate = useNavigate();
  //? ================================  Api Calls ================================
  const [forgetPassword, { isLoading: isForgetPasswordLoading }] =
    useForgetPasswordFirstMutation();
  //? ================================  Effects  ================================
  useEffect(() => {
    removeFromStorage("tempInfo");
    setLocalStorage("currentPage", "1");
  }, []);
  //* ================================ Util Functions ================================

  const handleSubmit = (values: FirstFormType) => {
    forgetPassword({ username: values?.username })
      .unwrap()
      .then((res) => {
        if (res.token) {
          setLocalStorage("tempInfo", res?.token);
          setLocalStorage("tempUser", values?.username);
          navigate({
            pathname: FORGOT_PASSWORD_SECOND_PAGE_ROUTE,
            search: makeSearchParams({
              mobileNumber: res?.mobileNumber,
            }),
          });
          setLocalStorage("currentPage", "2");
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
      <div className="auth-header-first-container">
        <AuthTitle icon={PiFingerprint} label="فراموشی رمز عبور" />
        <AuthStepper itemCount={4} currentStep={1} />
        <Form
          form={form}
          className="auth-forget-password-form-container"
          onFinish={handleSubmit}
        >
          <div className="auth-forget-password-form-content">
            <div>
              <CustomInput
                placeholder="کد ملی خود را وارد نمایید."
                label="نام کاربری"
                type="text"
                name="username"
                rules={[REQUIRED_RULE]}
                disabled={isForgetPasswordLoading}
                prefix={<PiUser size={16} />}
              />
              <LabelCard
                title="به رمز عبور خود دسترسی دارید؟"
                linkLabel="ورود به حساب کاربری"
                to={SIGN_IN_FIRST_PAGE_ROUTE}
                className="custom-Label-card"
                prefix={<PiFingerprint />}
              />
            </div>
          </div>
          <CustomButton
            htmlType="submit"
            type="primary"
            loading={isForgetPasswordLoading}
          >
            ثبت و ادامه
          </CustomButton>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default ForgetPasswordFirstPage;
