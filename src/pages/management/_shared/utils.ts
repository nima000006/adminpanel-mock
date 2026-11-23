export const renderDefault = (value: string) => {
  return value !== null && value !== undefined && value !== "" ? value : "-";
};

export const USER_GROUP_STAFF_STATUS: Record<string, string> = {
  STUDENT: "STUDENT",
  EMPLOYEE: "EMPLOYEE",
  ADMIN: "ADMIN",
};

export const USER_GROUP_STAFF_TEXT: Record<string, string> = {
  [USER_GROUP_STAFF_STATUS.STUDENT]: "دانشجو",
  [USER_GROUP_STAFF_STATUS.EMPLOYEE]: "کارمند",
  [USER_GROUP_STAFF_STATUS.ADMIN]: "ادمین",
};

export const USER_GROUP_STAFF_COLOR: Record<string, string> = {
  [USER_GROUP_STAFF_STATUS.STUDENT]: "processing",
  [USER_GROUP_STAFF_STATUS.EMPLOYEE]: "volcano",
  [USER_GROUP_STAFF_STATUS.ADMIN]: "gold",
};

export const USER_DETAIL_INFO_USER_GROUP_FILTER_OPTIONS = [
  {
    text: USER_GROUP_STAFF_TEXT[USER_GROUP_STAFF_STATUS.STUDENT],
    value: USER_GROUP_STAFF_STATUS.STUDENT,
  },
  {
    text: USER_GROUP_STAFF_TEXT[USER_GROUP_STAFF_STATUS.EMPLOYEE],
    value: USER_GROUP_STAFF_STATUS.EMPLOYEE,
  },
  {
    text: USER_GROUP_STAFF_TEXT[USER_GROUP_STAFF_STATUS.ADMIN],
    value: USER_GROUP_STAFF_STATUS.ADMIN,
  },
];

export const ADMIN_ACTIVE_DE_ACTIVE_STATUS: Record<string, 1 | 2> = {
  active: 1,
  deActive: 2,
};

const persianToEnglish = (str: string) =>
  str.replace(/[۰-۹]/g, (d) => String("۰۱۲۳۴۵۶۷۸۹".indexOf(d)));

const currentYear = Number(
  persianToEnglish(
    new Intl.DateTimeFormat("fa-IR-u-ca-persian", {
      year: "numeric",
    }).format(new Date())
  )
);

export const ENTRANCE_YEARS_OPTIONS = Array.from(
  { length: currentYear - 1390 + 1 },
  (_, index) => {
    const year = 1390 + index;

    return {
      id: index + 1,
      value: String(year),
      title: String(year),
    };
  }
).reverse();

export const manuallyInquiryTagDataGenerator = (isManual: boolean) => {
  if (isManual) {
    return {
      text: "دستی",
      color: "red",
    };
  } else {
    return {
      text: "سیستمی",
      color: "blue",
    };
  }
};
