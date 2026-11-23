export interface PasswordValidationStatus {
  length: boolean;
  englishOnly: boolean;
  hasUpper: boolean;
  hasLower: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
  match: boolean;
}
