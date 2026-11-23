export const TEST_IDS = {
  Immediate: "3", // نیازمند پیگیری فوری
  follow: "2", // پیگیری
  notFollow: "1", //  عدم پیگیری
};

export const SURVEY_STATUS_COLOR: Record<number, string> = {
  1: "blue", //  عدم پیگیری
  2: "orange", // پیگیری
  3: "red", // نیازمند پیگیری فوری
};

export const TEST_ACTION_IDS = {
  needAction: "1", // نیازمند اقدام
  noNeedAction: "2", // عدم نیاز به اقدام
  needReAction: "3", //  نیازمند اقدام مجدد
};

export const SUICIDE_STATUS = {
  normal: 1,
  risk: 2,
  highRisk: 3,
  veryHighRisk: 4,
};

export const SUICIDE_STATUS_TITLE: Record<number, string> = {
  1: "نرمال",
  2: "خطر خودکشی",
  3: "خطر خودکشی بالا",
  4: "خطر خودکشی خیلی بالا",
};

export const SUICIDE_STATUS_COLOR: Record<number, string> = {
  1: "green",
  2: "gold",
  3: "orange",
  4: "red",
};

export const SUICIDE_STATUS_OPTIONS = [
  {
    id: 1,
    title: "نرمال",
  },
  {
    id: 2,
    title: "خطر خودکشی",
  },
  {
    id: 3,
    title: "خطر خودکشی بالا",
  },
  {
    id: 4,
    title: "خطر خودکشی خیلی بالا",
  },
];

export const BASED_ON_FOLLOW_UP_PRIORITY = [
  {
    id: +TEST_IDS?.Immediate,
    title: "نیازمند پیگیری فوری",
  },
  {
    id: +TEST_IDS?.follow,
    title: "نیازمند پیگیری",
  },
  {
    id: +TEST_IDS?.notFollow,
    title: "عدم نیاز پیگیری",
  },
];

export const BASED_ON_ACTION = [
  {
    id: +TEST_ACTION_IDS?.needAction,
    title: "نیازمند اقدام",
  },
  {
    id: +TEST_ACTION_IDS?.noNeedAction,
    title: "عدم نیاز به اقدام",
  },
  {
    id: +TEST_ACTION_IDS?.needReAction,
    title: "نیازمند اقدام مجدد",
  },
];
