export const SURVEY_STATUS: Record<
  string,
  "medium" | "emergency" | "normal" | "default"
> = {
  1: "normal",
  2: "medium",
  3: "emergency",
  4: "default",
};

export const SURVEY_TEXT: Record<string, string> = {
  1: "عدم نیاز پیگیری",
  2: "نیازمند پیگیری",
  3: "نیازمند پیگیری فوری",
  4: "متن پیش فرض",
};

// export const FOLLOW_UP_TEXT: Record<string, string> = {
//   ["PHONE_CALLs"]: "تماس تلفنی",
//   ["MEETING"]: "جلسه حضوری ",
//   ["ONLINE_MEETING"]: "جلسه آنلاین",
// };
