import { useState } from "react";

import { Checkbox, CheckboxChangeEvent, Steps } from "antd";
import { PiPassword } from "react-icons/pi";

import CustomInput from "@components/CustomInputs/CustomInput/CustomInput";
import { REQUIRED_RULE } from "@infra/validation/validationSchema";

import { SubmitChangePasswordModalContentProps } from "./@types/@submitChangePasswordModalContent";
import ChangePasswordStep from "./components/ChangePasswordStep/ChangePasswordStep";
import "./_submitChangePasswordModalContent.scss";

const SubmitChangePasswordModalContent = ({
  current,
  form,
  onPasswordRulesPassed,
}: SubmitChangePasswordModalContentProps) => {
  const [showPassword, setShowPassword] = useState(false);

  //* ================================ Util Functions ================================

  const handleCheckboxChange = (e: CheckboxChangeEvent) => {
    setShowPassword(e.target.checked);
  };

  const steps = [
    {
      title: "رمز عبور فعلی",
      content: (
        <div className="profile-first-step-password-wrapper">
          <CustomInput
            prefix={<PiPassword />}
            type={showPassword ? "text" : "password"}
            label="رمز عبور فعلی"
            name="password"
            placeholder="رمز عبور خود را وارد نمایید."
            rules={[REQUIRED_RULE]}
            autoComplete="current-password"
          />

          <Checkbox onChange={handleCheckboxChange} checked={showPassword}>
            نمایش رمزعبور
          </Checkbox>
        </div>
      ),
    },

    {
      title: "تغییر رمز عبور",
      content: (
        <ChangePasswordStep
          showPassword={showPassword}
          setShowPassword={setShowPassword}
          onPasswordRulesPassed={onPasswordRulesPassed}
          form={form}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲
  return (
    <div className="submit-change-password-modal-content-container">
      <Steps current={current} items={items} />
      <div>{steps[current].content}</div>
    </div>
  );
};
export default SubmitChangePasswordModalContent;
