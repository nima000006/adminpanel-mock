import { Rule, RuleObject } from "antd/es/form";
import { NamePath } from "antd/es/form/interface";

import { PriceSeparator } from "@infra/helpers/utils";

export const REQUIRED_RULE = {
  required: true,
  message: "اطلاعات ضروری می باشد.",
};

export const CUSTOM_REQUIRED_RULE_LIVE = (errorMsg: string) => {
  return { message: errorMsg };
};
export const CUSTOM_REQUIRED_RULE = (errorMsg: string) => {
  return { required: true, message: errorMsg };
};

export const MIN_LENGTH_RULE = (length: number) => {
  return {
    min: length,
    message: `لطفا بیشتر از ${length} کاراکتر وارد نمائید.`,
  };
};

export const REQUIRED_NO_SPACE_RULE: Rule = {
  required: true,
  validator: (_, value) => {
    if (typeof value === "string" && value.trim() === "") {
      return Promise.reject(
        new Error("اطلاعات ضروری می باشد و نمی‌تواند فقط فاصله باشد.")
      );
    }
    return Promise.resolve();
  },
  message: "اطلاعات ضروری می باشد.",
};

export const MAX_LENGTH_RULE = (length: number) => {
  return {
    max: length,
    message: `لطفا کمتر از ${length} کاراکتر وارد نمائید.`,
  };
};

export const MAX_MIN_LENGTH_RULE = (min: number, max: number) => {
  return {
    max,
    min,
    message: `کاراکتر وارد شده باید بین ${min} تا ${max} باشد`,
  };
};

export const LENGTH_RULE = (length: number) => {
  return {
    len: length,
    message: `${length} رقمی`,
  };
};

export const HOME_PHONE_RULE = {
  pattern: new RegExp(/^0[0-9]{10}$/),
  message: "لطفا شماره تلفن را با فرمت مناسب وارد نمائید.",
};

export const POSTAL_CODE_RULE = {
  pattern: new RegExp(/^\d{10}$/),
  message: "لطفا کدپستی را با فرمت مناسب وارد نمائید.",
};

const ISBN_10_DIGIT_COUNT = 10; // Standard ISBN-10 length
const ISBN_13_DIGIT_COUNT = 13; // Standard ISBN-13 length

export const ISBN_RULE: Rule = {
  validator(_rule: RuleObject, value: string | undefined) {
    if (!value) {
      return Promise.resolve();
    }

    const digitCount = value.length;
    const isValidIsbnLength =
      digitCount === ISBN_10_DIGIT_COUNT || digitCount === ISBN_13_DIGIT_COUNT;

    if (isValidIsbnLength) {
      return Promise.resolve();
    }

    return Promise.reject(new Error("شابک باید ۱۰ یا ۱۳ رقم باشد."));
  },
};

export const NUMBER_RULE = {
  // pattern: new RegExp(/^[0-9]/),
  pattern: new RegExp(/^\d+$/),
  message: "لطفا عدد وارد نمائید.",
};

export const NUMBER_MAX_RULE: (max: number) => Rule = (max) => {
  return {
    type: "number",
    max: max,
    message: `عدد وارد شده باید کمتر از ${max} باشد.`,
  };
};
export const NUMBER_MIN_RULE: (min: number) => Rule = (min) => {
  return {
    type: "number",
    min: min,
    message: `عدد وارد شده باید بیشتر از ${min} باشد.`,
  };
};

/**
 * Number max validation rule with formatted number display (with thousand separators)
 */
export const NUMBER_MAX_RULE_FORMATTED: (max: number) => Rule = (max) => {
  const toman = Math.floor(max / 10);

  return {
    type: "number",
    max,
    message: `عدد وارد شده باید کمتر از ${PriceSeparator(toman.toString())} تومان باشد.`,
  };
};

/**
 * Number min validation rule with formatted number display (with thousand separators)
 */
export const NUMBER_MIN_RULE_FORMATTED: (min: number) => Rule = (min) => {
  const toman = Math.floor(min / 10);

  return {
    type: "number",
    min,
    message: `عدد وارد شده باید بیشتر از ${PriceSeparator(toman.toString())} تومان باشد.`,
  };
};

//not used
export const TIME_RULE = {
  pattern: new RegExp(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/),
  message: "لطفا با فرمت  00:00 وارد کنید.",
};

export const ZERO_RULE = {
  pattern: new RegExp(/^([1-9][0-9]*)|([0]+)$/),
  message: "رقم وارد شده نمی تواند با صفر شروع شود.",
};

export const CUSTOM_INPUT_NUMBER_MAX_RULE =
  (getFieldValue: NamePath, filedName: string, max: number) => () => {
    if (Number(getFieldValue(filedName))?.toString()?.length > max) {
      return Promise.reject(new Error(` عدد وارد شده باید کمتر از ${max} کاراکتر باشد.`));
    }
    return Promise.resolve();
  };

export const CUSTOM_INPUT_NUMBER_MIN_RULE =
  (getFieldValue: NamePath, filedName: string, min: number) => () => {
    if (Number(getFieldValue(filedName))?.toString()?.length < min) {
      return Promise.reject(
        new Error(` عدد وارد شده باید بیشتر از ${min} کاراکتر باشد.`)
      );
    }
    return Promise.resolve();
  };

export const NUMBER_RANGE_RULE: (min: number, max: number) => Rule = (min, max) => ({
  validator(_, value) {
    if (value === undefined || value === null || value === "") {
      return Promise.reject("لطفاً نمره‌ای وارد کنید.");
    }
    if (value < min || value > max) {
      return Promise.reject(`نمره وارد شده باید بین ${min} و ${max} باشد.`);
    }
    return Promise.resolve();
  },
});

export const PERSIAN_TEXT_RULE = {
  pattern: new RegExp(/^[\u0600-\u06FF\s\d]+$/),
  message: "لطفاً فقط از اعداد و حروف فارسی استفاده نمایید.",
};

export const PERSIAN_LETTERS_RULE = {
  pattern: new RegExp(/^[\u0600-\u06FF\s]+$/),
  message: "لطفاً فقط از حروف فارسی استفاده نمایید.",
};

export const ARABIC_LETTERS_RULE = {
  pattern: /^(?!.*[\u067E\u0686\u0698\u06AF])[\u0600-\u06FF\s]+$/,
  message: "لطفاً فقط از حروف عربی استفاده نمایید.",
};

export const LEGAL_CODE_RULE = {
  pattern: new RegExp(/^\d{10,11}$/),
  message: "شماره باید ۱۰ یا ۱۱ رقم باشد.",
};

export const NUMBER_MAX_LENGTH_RULE: (maxDigits: number) => Rule = (maxDigits) => {
  return {
    validator(_: any, value: number) {
      if (value && value.toString().replace(".", "").length > maxDigits) {
        return Promise.reject(`عدد وارد شده باید حداکثر ${maxDigits} رقم داشته باشد.`);
      }
      return Promise.resolve();
    },
  };
};

// ============ NEW VALIDATION RULES ============

/**
 * Email validation for Persian and English formats
 */
export const EMAIL_RULE: Rule = {
  type: "email",
  pattern: new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/),
  message: "لطفاً ایمیل معتبر وارد نمایید.",
};

/**
 * Strong password validation (min 8 chars, uppercase, lowercase, number, special char)
 */
export const STRONG_PASSWORD_RULE: Rule = {
  pattern: new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/
  ),
  message: "رمز عبور باید حداقل ۸ کاراکتر شامل حروف بزرگ، کوچک، عدد و کاراکتر خاص باشد.",
};

/**
 * Weak password validation (min 6 chars)
 */
export const WEAK_PASSWORD_RULE: Rule = {
  min: 6,
  message: "رمز عبور باید حداقل ۶ کاراکتر باشد.",
};

/**
 * URL validation
 */
export const URL_RULE: Rule = {
  type: "url",
  pattern: new RegExp(/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/),
  message: "لطفاً آدرس اینترنتی معتبر وارد نمایید.",
};

/**
 * Iranian mobile number validation (09xxxxxxxxx)
 */
export const MOBILE_RULE: Rule = {
  pattern: new RegExp(/^09[0-9]{9}$/),
  message: "لطفاً شماره موبایل معتبر وارد نمایید. (مثال: 09123456789)",
};

/**
 * Iranian national code validation with checksum
 */
export const NATIONAL_CODE_RULE: Rule = {
  validator(_: any, value: string) {
    if (!value) return Promise.resolve();

    // Remove non-digits
    const nationalCode = value.toString().replace(/\D/g, "");

    // Check length
    if (nationalCode.length !== 10) {
      return Promise.reject("کد ملی باید ۱۰ رقم باشد.");
    }

    // Check for invalid patterns
    const invalidPatterns = [
      "0000000000",
      "1111111111",
      "2222222222",
      "3333333333",
      "4444444444",
      "5555555555",
      "6666666666",
      "7777777777",
      "8888888888",
      "9999999999",
    ];
    if (invalidPatterns.includes(nationalCode)) {
      return Promise.reject("کد ملی وارد شده معتبر نیست.");
    }

    // Checksum validation
    const check = parseInt(nationalCode.charAt(9));
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(nationalCode.charAt(i)) * (10 - i);
    }
    const remainder = sum % 11;
    const isValid =
      (remainder < 2 && check === remainder) ||
      (remainder >= 2 && check === 11 - remainder);

    if (!isValid) {
      return Promise.reject("کد ملی وارد شده معتبر نیست.");
    }

    return Promise.resolve();
  },
};

/**
 * Iranian national and foreign
 *  code validation with checksum
 */
export const NATIONAL_OR_FOREIGN_CODE_RULE: Rule = {
  validator(_, value: string) {
    if (!value) return Promise.resolve();

    const code = value.toString().replace(/\D/g, "");

    // فقط 8 تا 12 رقم مجاز است
    if (code.length < 8 || code.length > 12) {
      return Promise.reject("کد ملی یا کد اتباع باید بین ۸ تا ۱۲ رقم باشد.");
    }

    // اگر 10 رقمی بود، ابتدا بررسی کن آیا کد ملی معتبر است یا خیر
    if (code.length === 10) {
      const invalidPatterns = [
        "0000000000",
        "1111111111",
        "2222222222",
        "3333333333",
        "4444444444",
        "5555555555",
        "6666666666",
        "7777777777",
        "8888888888",
        "9999999999",
      ];

      const isInvalidPattern = invalidPatterns.includes(code);

      let isValidNationalCode = false;

      if (!isInvalidPattern) {
        const check = Number(code[9]);

        let sum = 0;
        for (let i = 0; i < 9; i++) {
          sum += Number(code[i]) * (10 - i);
        }

        const remainder = sum % 11;

        isValidNationalCode =
          (remainder < 2 && check === remainder) ||
          (remainder >= 2 && check === 11 - remainder);
      }

      // اگر کد ملی معتبر بود قبول
      if (isValidNationalCode) {
        return Promise.resolve();
      }

      // اگر معتبر نبود، چون 10 رقم بین 8 تا 12 است،
      // به عنوان کد اتباع قبول می‌شود.
      return Promise.resolve();
    }

    // 8،9،11،12 رقمی ⇒ کد اتباع
    return Promise.resolve();
  },
};

/**
 * IBAN validation for Iranian bank accounts (with IR prefix)
 */
export const IBAN_RULE: Rule = {
  pattern: new RegExp(/^IR[0-9]{24}$/),
  message:
    "شماره شبا باید با IR شروع شده و ۲۴ رقم باشد. (مثال: IR000000000000000000000000)",
};

/**
 * IBAN validation for Iranian bank accounts without IR prefix (24 digits only)
 */
export const IBAN_WITHOUT_IR_RULE: Rule = {
  pattern: new RegExp(/^[0-9]{24}$/),
  message: "شماره شبا باید ۲۴ رقم باشد. (مثال: 000000000000000000000000)",
};

/**
 * Card number validation (16 digits with optional dashes/spaces)
 */
export const CARD_NUMBER_RULE: Rule = {
  pattern: new RegExp(
    /^[0-9]{16}$|^[0-9]{4}-[0-9]{4}-[0-9]{4}-[0-9]{4}$|^[0-9]{4}\s[0-9]{4}\s[0-9]{4}\s[0-9]{4}$/
  ),
  message: "شماره کارت باید ۱۶ رقم باشد.",
};

/**
 * Username validation (alphanumeric, underscore, dash, 3-20 chars)
 */
export const USERNAME_RULE: Rule = {
  pattern: new RegExp(/^[a-zA-Z0-9_-]{3,20}$/),
  message: "نام کاربری باید بین ۳ تا ۲۰ کاراکتر شامل حروف انگلیسی، اعداد، _ و - باشد.",
};

/**
 * English text only validation
 */
export const ENGLISH_TEXT_RULE: Rule = {
  pattern: new RegExp(/^[a-zA-Z\s]+$/),
  message: "لطفاً فقط از حروف انگلیسی استفاده نمایید.",
};

/**
 * Alphanumeric validation (English letters and numbers only)
 */
export const ALPHANUMERIC_RULE: Rule = {
  pattern: new RegExp(/^[a-zA-Z0-9]+$/),
  message: "لطفاً فقط از حروف انگلیسی و اعداد استفاده نمایید.",
};

/**
 * No special characters validation
 */
export const NO_SPECIAL_CHARS_RULE: Rule = {
  pattern: new RegExp(/^[a-zA-Z0-9\u0600-\u06FF\s]+$/),
  message: "استفاده از کاراکترهای خاص مجاز نیست.",
};

/**
 * Positive number validation
 */
export const POSITIVE_NUMBER_RULE: Rule = {
  validator(_: any, value: number) {
    if (value !== undefined && value !== null && value <= 0) {
      return Promise.reject("عدد وارد شده باید مثبت باشد.");
    }
    return Promise.resolve();
  },
};

/**
 * Non-negative number validation (including zero)
 */
export const NON_NEGATIVE_NUMBER_RULE: Rule = {
  validator(_: any, value: number) {
    if (value !== undefined && value !== null && value < 0) {
      return Promise.reject("عدد وارد شده نمی‌تواند منفی باشد.");
    }
    return Promise.resolve();
  },
};

/**
 * Integer validation (no decimals)
 */
export const INTEGER_RULE: Rule = {
  pattern: new RegExp(/^-?\d+$/),
  message: "لطفاً فقط عدد صحیح وارد نمایید.",
};

/**
 * Decimal validation (with specific decimal places)
 */
export const DECIMAL_RULE = (decimalPlaces = 2): Rule => {
  return {
    pattern: new RegExp(`^-?\\d+(\\.\\d{1,${decimalPlaces}})?$`),
    message: `عدد وارد شده باید حداکثر ${decimalPlaces} رقم اعشار داشته باشد.`,
  };
};

/**
 * Percentage validation (0-100)
 */
export const PERCENTAGE_RULE: Rule = {
  validator(_: any, value: number) {
    if (value !== undefined && value !== null && (value < 0 || value > 100)) {
      return Promise.reject("درصد وارد شده باید بین ۰ تا ۱۰۰ باشد.");
    }
    return Promise.resolve();
  },
};

/**
 * Date range validation - start date before end date
 */
export const DATE_RANGE_RULE = (startDateField: string, endDateField: string) => ({
  validator(_: any, _value: any, callback: any) {
    const form = callback;
    const startDate = form?.getFieldValue(startDateField);
    const endDate = form?.getFieldValue(endDateField);

    if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
      return Promise.reject("تاریخ شروع باید قبل از تاریخ پایان باشد.");
    }
    return Promise.resolve();
  },
});

/**
 * Future date validation
 */
export const FUTURE_DATE_RULE: Rule = {
  validator(_: any, value: any) {
    if (value && new Date(value) <= new Date()) {
      return Promise.reject("تاریخ باید در آینده باشد.");
    }
    return Promise.resolve();
  },
};

/**
 * Past date validation
 */
export const PAST_DATE_RULE: Rule = {
  validator(_: any, value: any) {
    if (value && new Date(value) >= new Date()) {
      return Promise.reject("تاریخ باید در گذشته باشد.");
    }
    return Promise.resolve();
  },
};

/**
 * Age validation (minimum age in years)
 */
export const MIN_AGE_RULE = (minAge: number): Rule => {
  return {
    validator(_: any, value: any) {
      if (!value) return Promise.resolve();

      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        if (age - 1 < minAge) {
          return Promise.reject(`سن باید حداقل ${minAge} سال باشد.`);
        }
      } else if (age < minAge) {
        return Promise.reject(`سن باید حداقل ${minAge} سال باشد.`);
      }

      return Promise.resolve();
    },
  };
};

/**
 * File size validation (in MB)
 */
export const FILE_SIZE_RULE = (maxSizeMB: number): Rule => {
  return {
    validator(_: any, file: any) {
      if (!file) return Promise.resolve();

      const isLessThanMaxSize = file.size / 1024 / 1024 < maxSizeMB;
      if (!isLessThanMaxSize) {
        return Promise.reject(`حجم فایل باید کمتر از ${maxSizeMB} مگابایت باشد.`);
      }
      return Promise.resolve();
    },
  };
};

/**
 * File type validation
 */
export const FILE_TYPE_RULE = (allowedTypes: string[]): Rule => {
  return {
    validator(_: any, file: any) {
      if (!file) return Promise.resolve();

      const isAllowedType = allowedTypes.includes(file.type);
      if (!isAllowedType) {
        return Promise.reject(`فرمت فایل باید ${allowedTypes.join(", ")} باشد.`);
      }
      return Promise.resolve();
    },
  };
};

/**
 * Whitespace validation - no leading/trailing spaces
 */
export const NO_WHITESPACE_RULE: Rule = {
  validator(_: any, value: string) {
    if (value && (value.startsWith(" ") || value.endsWith(" "))) {
      return Promise.reject("فاصله در ابتدا یا انتهای متن مجاز نیست.");
    }
    return Promise.resolve();
  },
};

/**
 * Confirm field validation (e.g., password confirmation)
 */
export const CONFIRM_FIELD_RULE = (fieldName: string, fieldLabel = "فیلد") => ({
  validator(_: any, value: any, callback: any) {
    const form = callback;
    const originalValue = form?.getFieldValue(fieldName);

    if (value && originalValue !== value) {
      return Promise.reject(`${fieldLabel} با تکرار آن مطابقت ندارد.`);
    }
    return Promise.resolve();
  },
});

/**
 * Array min length validation
 */
export const ARRAY_MIN_LENGTH_RULE = (minLength: number): Rule => {
  return {
    validator(_: any, value: any[]) {
      if (!value || value.length < minLength) {
        return Promise.reject(`حداقل ${minLength} مورد باید انتخاب شود.`);
      }
      return Promise.resolve();
    },
  };
};

/**
 * Array max length validation
 */
export const ARRAY_MAX_LENGTH_RULE = (maxLength: number): Rule => {
  return {
    validator(_: any, value: any[]) {
      if (value && value.length > maxLength) {
        return Promise.reject(`حداکثر ${maxLength} مورد می‌توان انتخاب کرد.`);
      }
      return Promise.resolve();
    },
  };
};

/**
 * Unique values in array validation
 */
export const UNIQUE_ARRAY_RULE: Rule = {
  validator(_: any, value: any[]) {
    if (value && value.length !== new Set(value).size) {
      return Promise.reject("مقادیر تکراری مجاز نیست.");
    }
    return Promise.resolve();
  },
};

/**
 * Prevents duplicate names already registered in basic info.
 * Pass the list of existing titles (trimmed comparison) and the error message.
 */
export const BASIC_INFO_DUPLICATE_NAME_RULE = (
  existingNames: string[],
  message: string
): Rule => ({
  validator(_, value) {
    if (value == null || value === "") {
      return Promise.resolve();
    }

    const normalizedValue = String(value).trim();
    if (!normalizedValue) {
      return Promise.resolve();
    }

    const isDuplicate = existingNames.some(
      (name) => String(name).trim() === normalizedValue
    );

    if (isDuplicate) {
      return Promise.reject(new Error(message));
    }

    return Promise.resolve();
  },
});

/**
 * Conditional required validation
 */
export const CONDITIONAL_REQUIRED_RULE = (
  conditionField: string,
  conditionValue: any,
  message = "این فیلد الزامی است."
) => ({
  validator(_: any, value: any, callback: any) {
    const form = callback;
    const fieldValue = form?.getFieldValue(conditionField);

    if (fieldValue === conditionValue && !value) {
      return Promise.reject(message);
    }
    return Promise.resolve();
  },
});

/**
 * Custom regex validation
 */
export const CUSTOM_REGEX_RULE = (pattern: RegExp, message: string): Rule => {
  return {
    pattern,
    message,
  };
};

/**
 * Custom async validation (e.g., check username availability)
 */
export const ASYNC_VALIDATOR_RULE = (
  validatorFn: (value: any) => Promise<boolean>,
  errorMessage: string
): Rule => {
  return {
    validator: async (_: any, value: any) => {
      if (!value) return Promise.resolve();

      const isValid = await validatorFn(value);
      if (!isValid) {
        return Promise.reject(errorMessage);
      }
      return Promise.resolve();
    },
  };
};

// Blocks any Farsi/Persian characters (Unicode range U+0600–U+06FF)
export const NO_PERSIAN_LETTERS_RULE: Rule = {
  validator(_, value) {
    if (/[\u0600-\u06FF]/.test(value)) {
      return Promise.reject(new Error("استفاده از حروف فارسی مجاز نمی‌باشد."));
    }
    return Promise.resolve();
  },
};

// Only Latin/English letters (no numbers, no symbols)
export const ENGLISH_LETTERS_ONLY_RULE: Rule = {
  pattern: new RegExp(/^[a-zA-Z\s]+$/),
  message: "لطفاً فقط از حروف انگلیسی استفاده نمایید.",
};

// No leading or trailing whitespace
export const NO_EDGE_SPACES_RULE: Rule = {
  validator(_, value) {
    if (typeof value === "string" && value !== value.trim()) {
      return Promise.reject(new Error("متن نباید با فاصله شروع یا تمام شود."));
    }
    return Promise.resolve();
  },
};

// Confirms a field matches another field's value (e.g. confirm password)
export const MATCH_FIELD_RULE = (
  getFieldValue: any,
  fieldName: string,
  errorMsg?: string
): Rule => ({
  validator(_, value) {
    if (!value || getFieldValue(fieldName) === value) {
      return Promise.resolve();
    }
    return Promise.reject(
      new Error(errorMsg ?? "مقادیر وارد شده با یکدیگر مطابقت ندارند.")
    );
  },
});

// Blocks any Farsi/Persian or Arabic characters (Arabic: U+0600–U+06FF, Arabic Presentation Forms: U+FB50–U+FDFF, U+FE70–U+FEFF)
export const NO_PERSIAN_ARABIC_RULE: Rule = {
  validator(_, value) {
    if (/[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(value)) {
      return Promise.reject(new Error("استفاده از حروف فارسی مجاز نمی‌باشد."));
    }
    return Promise.resolve();
  },
};

// Blocks Farsi/Persian digits (۰-۹ U+06F0–U+06F9) and Arabic-Indic digits (٠-٩ U+0660–U+0669)
export const NO_PERSIAN_ARABIC_DIGITS_RULE: Rule = {
  validator(_, value) {
    if (/[\u06F0-\u06F9\u0660-\u0669]/.test(value)) {
      return Promise.reject(new Error("استفاده از اعداد فارسی مجاز نمی‌باشد."));
    }
    return Promise.resolve();
  },
};

// Blocks both Farsi/Arabic letters AND Farsi/Arabic digits combined
export const NO_PERSIAN_ARABIC_ALL_RULE: Rule = {
  validator(_, value) {
    if (/[\u0600-\u06FF\uFB50-\uFDFF\uFE70-\uFEFF]/.test(value)) {
      return Promise.reject(new Error("استفاده از حروف و اعداد فارسی مجاز نمی‌باشد."));
    }
    return Promise.resolve();
  },
};
