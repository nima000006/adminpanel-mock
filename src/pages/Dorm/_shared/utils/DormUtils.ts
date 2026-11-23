import { CascaderNode } from "@infra/helpers/NetworkHelpers/commonTransformers/commonTransformers";
import { dataPlaceHolder } from "@infra/helpers/utils";
import { ApplicationTreeDataType } from "@pages/Dorm/Planning/Admission/AdmissionDetail/helpers/LevelsOfActionTree/@types/@admissionDetailLevelsOfActionTree";

//! COLORS
export const dormVisibilityStatusColor: Record<number, string> = {
  1: "green", // فعال قابل نمایش
  2: "gold", // فعال غیر قابل نمایش
  3: "red", // غیرفعال
};

export const dormRequestStatusColor: Record<number, string> = {
  1: "yellow", //در انتظار بررسی
  2: "green", //تایید شده
  3: "red", //رد شده
  4: "gold", //عودت شده
};

// نوع درخواست
export const dormRequestsTypeStatusColor: Record<number, string> = {
  7: "blue", // رزرو
  9: "green", // تمدید
  10: "gold", // جابجایی
};

// جنسیت
export const dormGenderStatusColor: Record<number, string> = {
  1: "purple", // آقا
  2: "volcano", // خانم
};

// گروه کاربری
export const dormUserGroupStatusColor: Record<number, string> = {
  1: "geekblue",
  2: "cyan",
  3: "red",
};

//نوع زمانبندی
export const dormSchedulingStatusColor: Record<number, string> = {
  1: "blue", // ترمیک
  2: "green", // ماهانه
  3: "gold", // روزانه
};

// نوع رزرو
export const dormReservationTypeStatusColor: Record<number, string> = {
  1: "green", // قطعی
  2: "red", // غیرقطعی با انتخاب خوابگاه
  3: "orange", // غیرقطعی با انتخاب تخت
};

// وضعیت تخت
export const dormBedAllocationStatusColor: Record<number, string> = {
  1: "green", // قابل تخصیص
  2: "red", // پر شده
  3: "orange", // در انتظار
};

// نوع پرداخت
export const dormPaymentMethod: Record<number, string> = { 1: "نقدی", 2: "اقساطی" };

export const dormPaymentStatus: Record<string, number> = { cash: 1, installment: 2 };

// امکان بدهی
export const dormCanDebtText: Record<number, string> = { 1: "بله", 2: "خیر" };

//! IDS
// گروه کاربری
export const userGroup: Record<string, number> = { student: 1, teacher: 2, staff: 3 };

//! UTIL FUNCTIONS
// slice one string to two parameters
export const entryYearSemesterGenerator = (value?: string) => {
  let entryYear = "";
  let entrySemester = "";

  if (!value) {
    return { entryYear: "-", entrySemester: "-" };
  }

  entryYear = value?.slice(0, 3);
  const tempEntrySemester = value?.slice(-1);
  entrySemester = tempEntrySemester === "1" ? "نیمسال اول" : "نیمسال دوم";

  return { entryYear: `1${entryYear}`, entrySemester };
};

// combine date and time
export const dateTimeCombiner = (date?: string, time?: string) => {
  return `${dataPlaceHolder({ data: time, isTime: true })} , ${dataPlaceHolder({ data: date, isDate: true })}`;
};

export const dormWaitingTimeOptions = [
  //! do not change the order as write logic based on order
  {
    id: 1,
    title: "کمتر از 3 روز ",
  },
  {
    id: 2,
    title: "بین 3 تا 7 روز",
  },
  {
    id: 3,
    title: "بیشتر از 7 روز",
  },
];

export const dormWaitingTimeQueryCreator = (id: number) => {
  //date.toISOString() -> "2025-05-10T14:30:00.000Z"
  //date.toISOString().split("T") -> ["2025-05-10", "14:30:00.000Z"]
  //date.toISOString().split("T")[0] -> "2025-05-10"
  const formatDate = (date: Date) => date.toISOString().split("T")[0];

  const now = new Date();

  if (id === dormWaitingTimeOptions[0].id) {
    // "کمتر از 3 روز "
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(now.getDate() - 3);

    return {
      queryParam: "createDate_BTW",
      value: `${formatDate(threeDaysAgo)} , ${formatDate(now)}`,
    };
  } else if (id === dormWaitingTimeOptions[1].id) {
    // "بین 3 تا 7 روز"
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(now.getDate() - 3);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    return {
      queryParam: "createDate_BTW",
      value: `${formatDate(sevenDaysAgo)} , ${formatDate(threeDaysAgo)}`,
    };
  } else if (id === dormWaitingTimeOptions[2].id) {
    //"بیشتر از 7 روز"
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(now.getDate() - 7);

    return {
      queryParam: "createDate_LTEQ",
      value: `${formatDate(sevenDaysAgo)}`,
    };
  } else {
    return undefined;
  }
};

export const applicationLevelDataForAntdTree = (data: CascaderNode[]) => {
  return data.map((node) => {
    const newNode: ApplicationTreeDataType = {
      title: node.label,
      key: String(node.value),
      disabled: true,
    };

    if (node.children && node.children.length > 0) {
      newNode.children = applicationLevelDataForAntdTree(node.children);
    } else {
      newNode.isLeaf = true;
    }

    return newNode;
  });
};

// مانده به پایان اسکان
export const daysRemaining = (targetDateStr: string) => {
  const now = new Date();
  const targetDate = new Date(targetDateStr);

  // Calculate the difference in milliseconds
  const diffMs = +targetDate - +now;

  // Convert milliseconds to days
  const diffDays = diffMs / (1000 * 60 * 60 * 24);

  // Return the number of days (rounded up to include partial days)
  return Math.ceil(diffDays);
};
