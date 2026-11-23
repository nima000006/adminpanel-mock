import { LuBan } from "react-icons/lu";
import { PiArrowLineDown, PiArrowLineUpRightLight, PiCheck } from "react-icons/pi";
import { RxCross2 } from "react-icons/rx";

// وضعیت کیف پول
export const WALLET_STATUS = {
  active: 1,
  temporaryBlocked: 2,
  blocked: 3,
};

export const WALLET_STATUS_TEXT = {
  [WALLET_STATUS.active]: "فعال",
  [WALLET_STATUS.temporaryBlocked]: "معلق شده",
  [WALLET_STATUS.blocked]: "مسدود شده",
};

export const WALLET_STATUS_COLOR = {
  [WALLET_STATUS.active]: "green",
  [WALLET_STATUS.temporaryBlocked]: "orange",
  [WALLET_STATUS.blocked]: "red",
};

export const WALLET_STATUS_ICON = {
  [WALLET_STATUS.active]: PiCheck,
  [WALLET_STATUS.temporaryBlocked]: RxCross2,
  [WALLET_STATUS.blocked]: LuBan,
};

// واحد پول
export const CURRENCY_STATUS = {
  IRR: "IRR", //1
  USD: "USD", //2
  EUR: "EUR", //3
};

export const CURRENCY_STATUS_TEXT = {
  [CURRENCY_STATUS.IRR]: "ریال",
  [CURRENCY_STATUS.USD]: "دلار",
  [CURRENCY_STATUS.EUR]: "یورو",
};

// نوع پول
export const MONEY_TYPE_STATUS = {
  fiat: "FIAT", //1
  credit: "CREDIT", //2
  crypto: "CRYPTO", // 3
};

export const MONEY_TYPE_STATUS_TEXT = {
  [MONEY_TYPE_STATUS.fiat]: "پول نقد",
  [MONEY_TYPE_STATUS.credit]: "اعتبار",
  [MONEY_TYPE_STATUS.crypto]: "کریپتو",
};

// جهت تراکنش
export const TRANSACTION_TYPE_STATUS = {
  deposit: "DEPOSIT", // 1
  withdraw: "WITHDRAW", //  2
};

export const TRANSACTION_TYPE_STATUS_TEXT = {
  [TRANSACTION_TYPE_STATUS.deposit]: "واریز",
  [TRANSACTION_TYPE_STATUS.withdraw]: "برداشت",
};

export const TRANSACTION_TYPE_STATUS_COLOR = {
  [TRANSACTION_TYPE_STATUS.deposit]: "green",
  [TRANSACTION_TYPE_STATUS.withdraw]: "red",
};

export const TRANSACTION_TYPE_STATUS_OPTIONS = [
  {
    text: TRANSACTION_TYPE_STATUS.deposit,
    id: 1,
    title: TRANSACTION_TYPE_STATUS_TEXT.DEPOSIT,
  },
  {
    text: TRANSACTION_TYPE_STATUS.withdraw,
    id: 2,
    title: TRANSACTION_TYPE_STATUS_TEXT.WITHDRAW,
  },
];

export const TRANSACTION_TYPE_STATUS_ICON = {
  [TRANSACTION_TYPE_STATUS.deposit]: <PiArrowLineDown color="#52C41A" size={16} />,
  [TRANSACTION_TYPE_STATUS.withdraw]: (
    <PiArrowLineUpRightLight color="#F5222D" size={16} />
  ),
};

//  مبدا و مقصئ تراکنش
export const TRANSACTION_SOURCE_STATUS = {
  walletToWallet: "WALLET_TO_WALLET", // 1 - از کیف پول به کیف پول
  depositIpg: "DEPOSIT_IPG", //2 - از بانک به کیف پول
  sharing: "SHARING", // 3 - تسهیم
  walletBank: "WALLET_BANK", //4 - از کیف پول به بانک
  firstDept: "FIRST_DEPT", //5 - بدهی اولیه
  revert: "REVERT", //6 - بازگشت به کیف پول
};

export const TRANSACTION_SOURCE_TEXT = {
  [TRANSACTION_SOURCE_STATUS.walletToWallet]: {
    start: "کیف پول",
    end: "کیف پول",
  },
  [TRANSACTION_SOURCE_STATUS.depositIpg]: {
    start: "بانک",
    end: "کیف پول",
  },
  [TRANSACTION_SOURCE_STATUS.sharing]: {
    start: "تسهیم",
    end: "تسهیم",
  },
  [TRANSACTION_SOURCE_STATUS.walletBank]: {
    start: "کیف پول",
    end: "بانک",
  },
  [TRANSACTION_SOURCE_STATUS.firstDept]: {
    start: "بدهی اولیه ",
    end: "بدهی اولیه ",
  },
  [TRANSACTION_SOURCE_STATUS.revert]: {
    start: "بازگشت به کیف پول ",
    end: "بازگشت به کیف پول ",
  },
};

export const WALLET_REQUEST_STATUS: Record<string, string> = {
  ACCEPTED: "ACCEPTED",
  REJECTED: "REJECTED",
  REQUESTED: "REQUESTED",
  SENT_TO_BANK: "SENT_TO_BANK",
};

export const WALLET_REQUEST_STATUS_TITLE: Record<string, string> = {
  [WALLET_REQUEST_STATUS.ACCEPTED]: "تایید شده",
  [WALLET_REQUEST_STATUS.REJECTED]: "رد شده",
  [WALLET_REQUEST_STATUS.REQUESTED]: "در انتظار بررسی",
  [WALLET_REQUEST_STATUS.SENT_TO_BANK]: "ارسال شده به بانک",
};

export const WALLET_REQUEST_STATUS_COLOR: Record<string, string> = {
  [WALLET_REQUEST_STATUS.ACCEPTED]: "green",
  [WALLET_REQUEST_STATUS.REJECTED]: "red",
  [WALLET_REQUEST_STATUS.REQUESTED]: "orange",
  [WALLET_REQUEST_STATUS.SENT_TO_BANK]: "default",
};

export const WALLET_ACTIVE_STATUS: Record<string, boolean> = {
  [WALLET_REQUEST_STATUS.ACCEPTED]: true,
  [WALLET_REQUEST_STATUS.REJECTED]: false,
  [WALLET_REQUEST_STATUS.REQUESTED]: false,
  [WALLET_REQUEST_STATUS.SENT_TO_BANK]: false,
};

export const TRANSACTION_USER_GROUP_STATUS = {
  STUDENT: "STUDENT",
  ADMIN: "ADMIN",
  EMPLOYEE: "EMPLOYEE",
};

export const TRANSACTION_USER_GROUP_TEXT: Record<string, string> = {
  [TRANSACTION_USER_GROUP_STATUS.STUDENT]: "دانشجو",
  [TRANSACTION_USER_GROUP_STATUS.ADMIN]: "ادمین",
  [TRANSACTION_USER_GROUP_STATUS.EMPLOYEE]: "کارمند",
};

export const TRANSACTION_USER_GROUP_COLOR: Record<string, string> = {
  [TRANSACTION_USER_GROUP_STATUS.STUDENT]: "geekblue",
  [TRANSACTION_USER_GROUP_STATUS.ADMIN]: "processing",
  [TRANSACTION_USER_GROUP_STATUS.EMPLOYEE]: "red",
};

export const TRANSACTION_AIM_STATUS = {
  WALLET_TO_WALLET: "WALLET_TO_WALLET",
  DEPOSIT_IPG: "DEPOSIT_IPG",
  SHARING: "SHARING",
  WALLET_BANK: "WALLET_BANK",
  FIRST_DEPT: "FIRST_DEPT",
  REVERT: "REVERT",
};

export const TRANSACTION_AIM_TEXT = {
  [TRANSACTION_AIM_STATUS.WALLET_TO_WALLET]: "انتقال به کیف پول سیستمی",
  [TRANSACTION_AIM_STATUS.DEPOSIT_IPG]: "شارژ کیف پول درگاه بانکی ",
  [TRANSACTION_AIM_STATUS.SHARING]: "تسهیم ",
  [TRANSACTION_AIM_STATUS.WALLET_BANK]: "برداشت از کیف پول",
  [TRANSACTION_AIM_STATUS.FIRST_DEPT]: "-",
  [TRANSACTION_AIM_STATUS.REVERT]: "عودت وجه ",
};

export const TRANSACTION_AIM_COLOR = {
  [TRANSACTION_AIM_STATUS.WALLET_TO_WALLET]: "green",
  [TRANSACTION_AIM_STATUS.DEPOSIT_IPG]: "blue",
  [TRANSACTION_AIM_STATUS.SHARING]: "gold",
  [TRANSACTION_AIM_STATUS.WALLET_BANK]: "red",
  [TRANSACTION_AIM_STATUS.FIRST_DEPT]: "",
  [TRANSACTION_AIM_STATUS.REVERT]: "purple",
};
