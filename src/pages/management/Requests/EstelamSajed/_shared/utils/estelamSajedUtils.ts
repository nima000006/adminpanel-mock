export const ESTELAM_SAJED_WAITING_REVIEW = 4;
export const ESTELAM_SAJED_CONFIRMED = 2;
export const ESTELAM_SAJED_REJECTED = 3;

export const EstelamSajedListTabsKeys = {
  waitingReview: "1",
  confirmed: "2",
  rejected: "3",
};

export const EstelamSajedTabsKeys = {
  waitingReview: "1",
  confirmed: "2",
  rejected: "3",
};

export const ESTELAM_SAJED_STATUS_COLOR: Record<number, string> = {
  [ESTELAM_SAJED_WAITING_REVIEW]: "yellow",
  [ESTELAM_SAJED_CONFIRMED]: "green",
  [ESTELAM_SAJED_REJECTED]: "red",
};

export const ESTELAM_SAJED_STATUS_TEXT: Record<number, string> = {
  [ESTELAM_SAJED_WAITING_REVIEW]: "در انتظار بررسی",
  [ESTELAM_SAJED_CONFIRMED]: "تایید شده",
  [ESTELAM_SAJED_REJECTED]: "رد شده",
};

export const ESTELAM_SAJED_REJECT_ACCEPT_STATUS = {
  accepted: 1,
  rejected: 2,
};

// MESSAGE
export const ESTELAM_SAJED_REJECT_SUCCESS_MESSAGE = "درخواست با موفقیت رد شد";
export const ESTELAM_SAJED_ACCEPT_SUCCESS_MESSAGE = "درخواست با موفقیت تایید شد.";
