import { PasswordValidationStatus } from "../@types/@validatePasswordRules";

export const validatePasswordRules = (
  password: string,
  confirmPassword?: string
): PasswordValidationStatus => {
  const isTyped = !!password;

  return {
    length: isTyped && password.length >= 8 && password.length <= 25,
    englishOnly: isTyped && /^[a-zA-Z0-9!@#$%^&*]*$/.test(password),
    hasUpper: isTyped && /[A-Z]/.test(password),
    hasLower: isTyped && /[a-z]/.test(password),
    hasNumber: isTyped && /\d/.test(password),
    hasSpecial: isTyped && /[!@#$%^&*]/.test(password),
    match: isTyped && confirmPassword === password,
  };
};
export const forgetPasswordTexts = {
  titles: {
    main: "فراموشی رمز عبور",
    createAccount: "ایجاد حساب",
  },
  button: {
    submit: "ثبت و ادامه",
    back: "بازگشت",
  },
  inputs: {
    password: "رمز عبور جدید",
    confirmPassword: "تکرار رمز عبور جدید",
  },
  validationMessages: {
    passwordLength: "رمز عبور باید حداقل ۸ و حداکثر ۲۵ کاراکتر داشته باشد.",
    englishOnly: "رمز عبور فقط به انگلیسی وارد شود.",
    hasUpper: "رمز عبور باید شامل یک حرف بزرگ (مثل A) باشد.",
    hasLower: "رمز عبور باید شامل یک حرف کوچک (مثل a) باشد.",
    hasNumber: "رمز عبور باید شامل یک عدد (مثل 1) باشد.",
    hasSpecial: "رمز عبور باید شامل یک کاراکتر خاص مانند !, @, #, $, %, &, * باشد.",
    match: "مطابقت رمز عبور و تکرار رمز عبور",
  },
};

export const REQUEST_TYPE_STATUS = {
  NEW: "NEW", // 1
  ACCEPTED: "ACCEPTED", // 2
  REJECTED: "REJECTED", // 3
};

export const REQUEST_TYPE_STATUS_TEXT: Record<string, string> = {
  [REQUEST_TYPE_STATUS.NEW]: "در انتظار بررسی",
  [REQUEST_TYPE_STATUS.ACCEPTED]: "تایید شده",
  [REQUEST_TYPE_STATUS.REJECTED]: "رد شده",
};

export const REQUEST_TYPE_STATUS_COLOR: Record<string, string> = {
  [REQUEST_TYPE_STATUS.NEW]: "gold",
  [REQUEST_TYPE_STATUS.ACCEPTED]: "green",
  [REQUEST_TYPE_STATUS.REJECTED]: "red",
};
