import { useEffect, useMemo, useState } from "react";

import { Checkbox, CheckboxChangeEvent, Form } from "antd";
import { PiPassword } from "react-icons/pi";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";
import PasswordValidationRules from "@pages/Auth/_shared/components/PasswordValidation/PasswordValidation";
import { validatePasswordRules } from "@pages/Auth/_shared/utils";
import { forgetPasswordTexts as texts } from "@pages/Auth/_shared/utils";

import { ChangePasswordStepProps } from "../../@types/@submitChangePasswordModalContent";
import "./_changePasswordStep.scss";

const ChangePasswordStep = ({
  showPassword,
  setShowPassword,
  form,
  onPasswordRulesPassed,
}: ChangePasswordStepProps) => {
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);

  const newPassword = Form.useWatch("newPassword", form);
  const confirmPassword = Form.useWatch("confirmPassword", form);

  //* ================================ Util Functions ================================
  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setShowPassword(e.target.checked);
  };

  // Extracted validation logic
  const passwordRulesStatus = useMemo(() => {
    const shouldValidate = passwordTouched || confirmPasswordTouched;
    return shouldValidate
      ? validatePasswordRules(newPassword, confirmPassword)
      : {
          length: false,
          englishOnly: false,
          hasUpper: false,
          hasLower: false,
          hasNumber: false,
          hasSpecial: false,
          match: false,
        };
  }, [newPassword, confirmPassword, passwordTouched, confirmPasswordTouched]);

  useEffect(() => {
    if (onPasswordRulesPassed) {
      const allPassed = Object.values(passwordRulesStatus).every(Boolean);
      onPasswordRulesPassed(allPassed);
    }
  }, [passwordRulesStatus, onPasswordRulesPassed]);

  //? ================================ Effects ================================

  return (
    <div className="profile-change-password-second-step-container">
      <div className="profile-change-password-second-step-wrapper">
        <CustomInput
          label="رمز عبور جدید"
          name="newPassword"
          prefix={<PiPassword />}
          rules={[REQUIRED_RULE]}
          type={showPassword ? "text" : "password"}
          onInput={() => setPasswordTouched(true)}
        />
        <CustomInput
          label="تکرار رمز عبور جدید"
          name="confirmPassword"
          prefix={<PiPassword />}
          rules={[REQUIRED_RULE]}
          type={showPassword ? "text" : "password"}
          onInput={() => setConfirmPasswordTouched(true)}
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
  );
};
export default ChangePasswordStep;
