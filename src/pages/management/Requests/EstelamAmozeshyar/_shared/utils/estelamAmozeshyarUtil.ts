export const ESTELAM_AMOZESHYAR_WAITING_REVIEW = 4;
export const ESTELAM_AMOZESHYAR_CONFIRMED = 2;
export const ESTELAM_AMOZESHYAR_REJECTED = 3;

export const ESTELAM_AMOZESHYAR_STATUS_TEXT: Record<number, string> = {
  [ESTELAM_AMOZESHYAR_WAITING_REVIEW]: "در انتظار بررسی",
  [ESTELAM_AMOZESHYAR_CONFIRMED]: "تایید شده",
  [ESTELAM_AMOZESHYAR_REJECTED]: "رد شده",
};

export const ESTELAM_AMOZESHYAR_STATUS_COLOR: Record<number, string> = {
  [ESTELAM_AMOZESHYAR_WAITING_REVIEW]: "yellow",
  [ESTELAM_AMOZESHYAR_CONFIRMED]: "green",
  [ESTELAM_AMOZESHYAR_REJECTED]: "red",
};

export const ESTELAM_AMOZESHYAR_REJECT_ACCEPT_STATUS = {
  accepted: 1,
  rejected: 2,
};

export const EstelamAmozeshyarListTabsKeys = {
  waitingReview: "1",
  confirmed: "2",
  rejected: "3",
};

export const ENTRANCE_SEMESTER_TEXT: Record<string, string> = {
  FIRST: "نیمسال اول",
  SECOND: "نیمسال دوم",
  SUMMER: "تابستان",
};

export const ENTRANCE_SEMESTER_OPTIONS = [
  {
    id: 1,
    value: "FIRST",
    title: ENTRANCE_SEMESTER_TEXT.FIRST,
  },
  {
    id: 2,
    value: "SECOND",
    title: ENTRANCE_SEMESTER_TEXT.SECOND,
  },
];

// MESSAGE
export const ESTELAM_AMOZESHYAR_REJECT_SUCCESS_MESSAGE = "درخواست با موفقیت رد شد";
export const ESTELAM_AMOZESHYAR_ACCEPT_SUCCESS_MESSAGE = "درخواست با موفقیت تایید شد.";

export const rejectReasonFinder = [
  { id: 1, title: "اطلاعات کافی وارد نشده است", value: "INSUFFICIENT_INFORMATION" },
  { id: 2, title: "اطلاعات واردشده نادرست است", value: "WRONG_INFORMATION" },
  { id: 3, title: "دسترسی کافی وجود ندارد", value: "LACK_ACCESSES" },
  { id: 3, title: "دسترسی کافی وجود ندارد", value: "LACK_ACCESSES" },
];
