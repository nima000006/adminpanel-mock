import { useEffect } from "react";

import { Form } from "antd";
import { PiUserPlus, PiDeviceMobileCamera, PiFingerprint } from "react-icons/pi";
import { useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { makeSearchParams } from "@infra/helpers/utils";
import {
  REGISTER_SECOND_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import {
  removeFromStorage,
  setLocalStorage,
} from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useRegisterStepFirstMutation } from "@infra/states/redux/Apis/auth/registerApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";

import { FirstFormType } from "../@types/@authRegisterTypes";
import "./_registerFirstPage.scss";

const RegisterFirstPage = () => {
  const [form] = Form.useForm<FirstFormType>();
  const navigate = useNavigate();

  //? ================================  Api Calls ================================
  const [registerFirstStep, { isLoading: isRegisterFirstStepLoading }] =
    useRegisterStepFirstMutation();
  //? ================================  Effects  ================================
  useEffect(() => {
    removeFromStorage("tempInfo");
    setLocalStorage("currentPage", "1");
  }, []);

  //* ================================ Util Functions ================================

  const handleSubmit = (values: FirstFormType) => {
    registerFirstStep({ mobileNumber: values?.mobileNumber })
      .unwrap()
      .then((res) => {
        if (res?.token) {
          setLocalStorage("tempInfo", res.token);
          navigate({
            pathname: REGISTER_SECOND_PAGE_ROUTE,
            search: makeSearchParams({
              mobileNumber: values.mobileNumber,
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
          icon={PiFingerprint}
          linkLabel="ورود به حساب کاربری"
          to={SIGN_IN_FIRST_PAGE_ROUTE}
        />
      }
    >
      <div className="register-auth-first-page-container">
        <AuthTitle icon={PiUserPlus} label="ثبت نام" />
        <AuthStepper currentStep={1} itemCount={6} />
        <Form
          form={form}
          className="register-auth-first-page-form-container"
          onFinish={handleSubmit}
        >
          <CustomInput
            type="mobileNumber"
            name="mobileNumber"
            prefix={<PiDeviceMobileCamera />}
            label="شماره همراه"
            placeholder="شماره همراه خود را وارد نمایید"
            rules={[REQUIRED_RULE]}
            disabled={isRegisterFirstStepLoading}
          />
          <CustomButton
            type="primary"
            htmlType="submit"
            loading={isRegisterFirstStepLoading}
          >
            ثبت و ادامه
          </CustomButton>
        </Form>
      </div>
    </AuthLayout>
  );
};

export default RegisterFirstPage;
