import React from "react";

import { PiWarningCircleDuotone } from "react-icons/pi";

import { PasswordValidationProps } from "./@types/@passwordValidation";
import "./_passwordValidationRules.scss";

const PasswordValidationRules: React.FC<PasswordValidationProps> = ({
  rulesStatus,
  messages,
  isTouched,
}) => {
  // ================================ Util Functions ================================
  const renderRuleItem = (condition: boolean, text: string) => {
    let className = "rule-item";

    if (isTouched) {
      className += condition ? " valid" : " invalid";
    }

    return (
      <div className={className} key={text}>
        <PiWarningCircleDuotone />
        <p>{text}</p>
      </div>
    );
  };

  //* ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ Main TSX ▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲▲ */

  return (
    <div className="auth-password-validation-container body-regular">
      {renderRuleItem(rulesStatus.length, messages.passwordLength)}
      {renderRuleItem(rulesStatus.englishOnly, messages.englishOnly)}
      {renderRuleItem(rulesStatus.hasUpper, messages.hasUpper)}
      {renderRuleItem(rulesStatus.hasLower, messages.hasLower)}
      {renderRuleItem(rulesStatus.hasNumber, messages.hasNumber)}
      {renderRuleItem(rulesStatus.hasSpecial, messages.hasSpecial)}
      {renderRuleItem(rulesStatus.match, messages.match)}
    </div>
  );
};

export default PasswordValidationRules;
