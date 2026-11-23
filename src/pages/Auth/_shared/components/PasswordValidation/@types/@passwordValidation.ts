type PasswordRulesStatus = {
  length: boolean;
  englishOnly: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  match: boolean;
};

export type PasswordValidationProps = {
  rulesStatus: PasswordRulesStatus;
  isTouched: boolean;
  messages: {
    passwordLength: string;
    englishOnly: string;
    hasUpper: string;
    hasLower: string;
    hasNumber: string;
    hasSpecial: string;
    match: string;
  };
};
