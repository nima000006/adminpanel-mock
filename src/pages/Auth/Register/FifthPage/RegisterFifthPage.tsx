import { useState, useEffect, useMemo } from "react";

import { Checkbox, CheckboxChangeEvent, Form } from "antd";
import { PiFingerprint, PiPassword, PiArrowRight, PiUserPlus } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import {
  REGISTER_FIRST_PAGE_ROUTE,
  REGISTER_SIXTH_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import { setLocalStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useRegisterStepFifthMutation } from "@infra/states/redux/Apis/auth/registerApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";
import PasswordValidationRules from "@pages/Auth/_shared/components/PasswordValidation/PasswordValidation";
import useRedirectIfStepInvalid from "@pages/Auth/_shared/customHooks/useRedirectIfStepInvalid";
import { validatePasswordRules } from "@pages/Auth/_shared/utils";
import { forgetPasswordTexts as texts } from "@pages/Auth/_shared/utils";

import { FifthFormType } from "../@types/@authRegisterTypes";
import "./_registerFifthPage.scss";

const SUCCESS_REGISTER = "ثبت نام با موفقیت انجام شد.";
const RegisterFifthPage = () => {
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const [form] = Form.useForm<FifthFormType>();

  const password = Form.useWatch("password", form);
  const confirmPassword = Form.useWatch("confirmPassword", form);

  useRedirectIfStepInvalid(5, REGISTER_FIRST_PAGE_ROUTE);

  //? ================================  Api Calls ================================
  const [registerFifthStep, { isLoading: isRegisterFifthStepLoading }] =
    useRegisterStepFifthMutation();

  // ================================ Util Functions ================================
  // Extracted validation logic
  const passwordRulesStatus = useMemo(() => {
    const shouldValidate = passwordTouched || confirmPasswordTouched;

    return shouldValidate
      ? validatePasswordRules(password, confirmPassword)
      : {
          length: false,
          englishOnly: false,
          hasUpper: false,
          hasLower: false,
          hasNumber: false,
          hasSpecial: false,
          match: false,
        };
  }, [password, confirmPassword, passwordTouched, confirmPasswordTouched]);

  const handleSubmit = (values: FifthFormType) => {
    registerFifthStep({
      confirmPassword: values?.confirmPassword,
      password: values?.password,
    })
      .unwrap()
      .then((res) => {
        if (res?.access_token) {
          setLocalStorage("mainToken", res?.access_token);
          toast.success(SUCCESS_REGISTER, {
            toastId: SUCCESS_REGISTER,
          });
          navigate(REGISTER_SIXTH_PAGE_ROUTE, { replace: true });
          setLocalStorage("currentPage", "6");
        }
      })
      .catch((error) => {
        console.error("Forget password request failed:", error);
      });
  };

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setShowPassword(e.target.checked);
  };

  // ================================ Effects ================================
  useEffect(() => {
    return () => {
      setPasswordTouched(false);
      setConfirmPasswordTouched(false);
    };
  }, []);

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
      <div className="register-auth-fifth-container">
        <AuthTitle icon={PiUserPlus} label="ثبت نام" />
        <AuthStepper itemCount={6} currentStep={5} />
        <Form
          form={form}
          className="register-auth-fifth-form-container"
          onFinish={handleSubmit}
        >
          <div>
            <div className="password-wrapper">
              <CustomInput
                label="رمز عبور جدید"
                name="password"
                prefix={<PiPassword />}
                rules={[REQUIRED_RULE]}
                type={showPassword ? "text" : "password"}
                onInput={() => setPasswordTouched(true)}
                disabled={isRegisterFifthStepLoading}
              />
              <CustomInput
                label="تکرار رمز عبور جدید"
                name="confirmPassword"
                prefix={<PiPassword />}
                rules={[REQUIRED_RULE]}
                type={showPassword ? "text" : "password"}
                onInput={() => setConfirmPasswordTouched(true)}
                disabled={isRegisterFifthStepLoading}
              />
              <Checkbox
                onChange={handleCheckboxChange}
                disabled={isRegisterFifthStepLoading}
                checked={showPassword}
              >
                نمایش رمزعبور
              </Checkbox>
            </div>
            <PasswordValidationRules
              rulesStatus={passwordRulesStatus}
              messages={texts.validationMessages}
              isTouched={passwordTouched || confirmPasswordTouched}
            />
          </div>
          <div className="auth-btn-container">
            <CustomButton
              htmlType="submit"
              type="primary"
              loading={isRegisterFifthStepLoading}
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

export default RegisterFifthPage;
