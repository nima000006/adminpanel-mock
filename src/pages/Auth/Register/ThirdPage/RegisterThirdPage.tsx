import { Form } from "antd";
import { PiUserPlus, PiUser, PiArrowRight, PiFingerprint } from "react-icons/pi";
import { Link, useNavigate } from "react-router";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import {
  REGISTER_FIRST_PAGE_ROUTE,
  REGISTER_FOURTH_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import { setLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useRegisterStepThirdMutation } from "@infra/states/redux/Apis/auth/registerApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";
import useRedirectIfStepInvalid from "@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid";

import { ThirdFormType } from "../@types/@authRegisterTypes";
import "./_registerThirdPage.scss";

const RegisterThirdPage = () => {
  const [form] = Form.useForm<ThirdFormType>();
  const navigate = useNavigate();
  useRedirectIfStepInvalid(3, REGISTER_FIRST_PAGE_ROUTE);
  //? ================================  Api Calls ================================
  const [registerThirdStep, { isLoading: isRegisterThirdStepLoading }] =
    useRegisterStepThirdMutation();
  //* ================================ Util Functions ================================
  const handleSubmit = (values: ThirdFormType) => {
    // 103 is region id and hard coded needed for backend !
    registerThirdStep({ nationalCode: values?.nationalCode, citizensTypeId: 103 })
      .unwrap()
      .then((res) => {
        if (res.token) {
          setLocalStorage("tempInfo", res?.token);
          navigate(REGISTER_FOURTH_PAGE_ROUTE);
          setLocalStorage("currentPage", "4");
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
      <div className="register-auth-third-page-container">
        <AuthTitle icon={PiUserPlus} label="ثبت نام" />
        <AuthStepper currentStep={3} itemCount={6} />
        <Form
          form={form}
          className="register-auth-third-page-form-container"
          onFinish={handleSubmit}
        >
          <CustomInput
            type="text"
            name="nationalCode"
            prefix={<PiUser />}
            label="نام کاربری"
            placeholder="کد ملی خود را وارد نمایید."
            rules={[REQUIRED_RULE]}
            disabled={isRegisterThirdStepLoading}
          />
          <div className="auth-btn-container">
            <CustomButton
              htmlType="submit"
              type="primary"
              loading={isRegisterThirdStepLoading}
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

export default RegisterThirdPage;
