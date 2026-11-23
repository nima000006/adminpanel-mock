export const FOREIGN_NATIONAL_WAITING_REVIEW = "SUBMIT";
export const FOREIGN_NATIONAL_CONFIRMED = "ACCEPTED";
export const FOREIGN_NATIONAL_REJECTED = "REJECTED";

export const FOREIGN_NATIONAL_TABS = {
  waitingReview: "4",
  confirmed: "2",
  rejected: "3",
};

export const FOREIGN_NATIONAL_STATUS_COLOR: Record<string, string> = {
  [FOREIGN_NATIONAL_WAITING_REVIEW]: "yellow",
  [FOREIGN_NATIONAL_CONFIRMED]: "green",
  [FOREIGN_NATIONAL_REJECTED]: "red",
};

export const FOREIGN_NATIONAL_STATUS_TEXT: Record<string, string> = {
  [FOREIGN_NATIONAL_WAITING_REVIEW]: "در انتظار بررسی",
  [FOREIGN_NATIONAL_CONFIRMED]: "تایید شده",
  [FOREIGN_NATIONAL_REJECTED]: "رد شده",
};

export const ESTELAM_TYPE = {
  IDENTITY_INFO: "1",
  EDUCATIONAL_INFO: "2",
  CONTACT_INFO: "3",
  ACADEMIC_PERFORMANCE: "4",
};
