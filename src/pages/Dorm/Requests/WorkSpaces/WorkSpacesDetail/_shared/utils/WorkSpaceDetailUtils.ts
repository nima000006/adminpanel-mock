// MASSAGE
export const WORK_SPACES_REQUEST_CONFIRMATION = "این درخواست توسط شما تأیید شده است.";
export const WORK_SPACES_REQUEST_AWAITING_REVIEW =
  "این درخواست در انتظار بررسی توسط شما است.";
export const WORK_SPACES_REQUEST_REJECT = "این درخواست توسط شما رد شده است.";
export const WORK_SPACES_REQUEST_RETURNED = "این درخواست توسط شما عودت داده شده است.";
export const WORK_SPACES_ADMISSION_SCHEDULE_MSG =
  "در این قسمت می‌توانید مشاهده کنید که این تعرفه در کدام برنامه پذیرش‌ها مورد استفاده قرار گرفته است.";

//
export const RequestTypeMode = (RequestTypeModeType: number) => {
  switch (RequestTypeModeType) {
    case 1:
      return "ایجاد کردن";
    case 2:
      return "غیر فعال کردن";
    case 3:
      return "ایجاد کردن";
    case 4:
      return "غیر فعال کردن ";
    case 5:
      return "ایجاد کردن";
    case 6:
      return "غیر فعال کردن ";
  }
};

export const StatusModeTag = (StatusModeType: number) => {
  switch (StatusModeType) {
    case 1:
      return "در انتظار بررسی";
    case 2:
      return "تایید شده";
    case 3:
      return "رد شده";
    case 4:
      return "عودت داده شده";
  }
};

export const StatusMode = {
  answered: 2,
  waiting: 1,
  rejected: 3,
  returned: 4,
};

export const RequestType = {
  createDorm: 1,
  disableDorm: 2,
  createTariff: 3,
  disableTariff: 4,
  createAdmission: 5,
  disableAdmission: 6,
};

export const ACCEPT_CODE = "1";
export const REJECT_CODE = "2";
export const RETURN_CODE = "3";

export const dataSource = [
  {
    title: "زمان اعمال مؤثر",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    id: 1,
    stringId: "Applied",
  },
  {
    title: "زمان رزرو",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    id: 2,
    stringId: "Reservation",
  },
  {
    title: "زمان اسکان",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    id: 3,
    stringId: "Delivery",
  },
  {
    title: "زمان تمدید",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    id: 4,
    stringId: "Extension",
    isDisabled: true,
  },
];
