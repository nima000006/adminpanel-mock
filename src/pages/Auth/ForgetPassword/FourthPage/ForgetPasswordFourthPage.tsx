import { useState, useMemo, useEffect } from "react";

import { Checkbox, CheckboxChangeEvent, Form } from "antd";
import { PiFingerprint, PiUserPlus, PiPassword, PiArrowRight } from "react-icons/pi";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";

import CustomButton from "@components/CustomInputs/CustomButton/CustomButton";
import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import {
  FORGOT_PASSWORD_FIRST_PAGE_ROUTE,
  REGISTER_FIRST_PAGE_ROUTE,
  SIGN_IN_FIRST_PAGE_ROUTE,
} from "@infra/router/routes/public";
import { removeFromStorage } from "@infra/services/UserTokenStorageManager/UserTokenStorageManager";
import { useForgetPasswordFourthMutation } from "@infra/states/redux/Apis/auth/forgetPasswordApis";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import AuthLayout from "@pages/Auth/_shared/AuthLayout/AuthLayout";
import AuthStepper from "@pages/Auth/_shared/components/AuthStepper/AuthStepper";
import AuthTitle from "@pages/Auth/_shared/components/AuthTitle/AuthTitle";
import LeftSideBannerItem from "@pages/Auth/_shared/components/LeftSideBannerItem/LeftSideBannerItem";
import PasswordValidationRules from "@pages/Auth/_shared/components/PasswordValidation/PasswordValidation";
import { validatePasswordRules } from "@pages/Auth/_shared/utils";
import { forgetPasswordTexts as texts } from "@pages/Auth/_shared/utils";

import { FourthFormType } from "../@types/@authForgetPasswordTypes";
import "./_forgetPasswordFourthPage.scss";

const ALL_RULES_DID_NOT_PASS = "رمز عبور با شروط مورد نظر هم خوانی ندارد.";
const SUCCESS_CHANGE_PASSWORD = "رمز عبور با موفقیت تغییر یافت.";

const ForgetPasswordFourthPage = () => {
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const [form] = Form.useForm<FourthFormType>();

  const password = Form.useWatch("password", form);
  const confirmPassword = Form.useWatch("confirmPassword", form);

  const navigate = useNavigate();

  // ================================ Api Calls ================================
  const [forgetPassword, { isLoading: isForgetPassword }] =
    useForgetPasswordFourthMutation();

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

  const handleSubmit = (values: FourthFormType) => {
    const allPassed = Object.values(passwordRulesStatus).every(Boolean);

    if (allPassed) {
      forgetPassword({
        confirmPassword: values?.confirmPassword,
        password: values?.password,
      })
        .unwrap()
        .then(() => {
          toast.success(SUCCESS_CHANGE_PASSWORD, {
            toastId: SUCCESS_CHANGE_PASSWORD,
          });
          navigate(SIGN_IN_FIRST_PAGE_ROUTE);
          removeFromStorage("currentPage");
        })
        .catch((error) => {
          console.error("Forget password request failed:", error);
        });
    } else {
      toast.warning(ALL_RULES_DID_NOT_PASS, { toastId: ALL_RULES_DID_NOT_PASS });
    }
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
          icon={PiUserPlus}
          linkLabel="ایجاد حساب"
          to={REGISTER_FIRST_PAGE_ROUTE}
        />
      }
    >
      <div className="auth-fourth-container">
        <AuthTitle icon={PiFingerprint} label="فراموشی رمز عبور" />
        <AuthStepper itemCount={4} currentStep={4} />
        <Form form={form} className="auth-fourth-form-container" onFinish={handleSubmit}>
          <div>
            <div className="password-wrapper">
              <CustomInput
                label="رمز عبور جدید"
                name="password"
                prefix={<PiPassword />}
                rules={[REQUIRED_RULE]}
                type={showPassword ? "text" : "password"}
                onInput={() => setPasswordTouched(true)}
                disabled={isForgetPassword}
              />
              <CustomInput
                label="تکرار رمز عبور جدید"
                name="confirmPassword"
                prefix={<PiPassword />}
                rules={[REQUIRED_RULE]}
                type={showPassword ? "text" : "password"}
                onInput={() => setConfirmPasswordTouched(true)}
                disabled={isForgetPassword}
              />
              <Checkbox onChange={handleCheckboxChange} checked={showPassword}>
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
            <CustomButton htmlType="submit" type="primary" loading={isForgetPassword}>
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

export default ForgetPasswordFourthPage;
