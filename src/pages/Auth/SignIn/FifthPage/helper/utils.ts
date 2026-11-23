export const WAITING_REVIEW = 4;
export const CONFIRMED = 2;
export const REJECTED = 3;
export const WAITING_COMPLETION = 1;

export const REQUEST_STATUS_TEXT: Record<number, string> = {
  [WAITING_REVIEW]: "در انتظار بررسی",
  [CONFIRMED]: "تایید شده",
  [REJECTED]: "رد شده",
  [WAITING_COMPLETION]: "در انتظار تکمیل",
};

export const REQUEST_STATUS_COLOR: Record<number, string> = {
  [WAITING_REVIEW]: "yellow",
  [CONFIRMED]: "green",
  [REJECTED]: "red",
  [WAITING_COMPLETION]: "gold",
};
