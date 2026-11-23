export const DORM_ADMISSION_LIST_ACTIVE = 1; // فعال
export const DORM_ADMISSION_LIST_INACTIVE = 3; // غیرفعال
export const DORM_ADMISSION_LIST_AWAITING_REVIEW = 1; // در انتظار بررسی
export const DORM_ADMISSION_LIST_RETURNED = 4; // عودت داده شده
export const DORM_ADMISSION_LIST_REJECTED = 3; // رد شده

export const massageCreatorInactiveAlert = (date: string | undefined) => {
  return `این برنامه پذیرش در تاریخ ${date} غیر فعال شده است.`;
};

export const dataSource = (isAppliedDisabled: boolean, isDeliveryDisabled = false) => [
  {
    title: "زمان اعمال مؤثر",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    id: 1,
    stringId: "Applied",
    isDisabled: isAppliedDisabled,
  },
  {
    title: "زمان رزرو",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    id: 2,
    stringId: "Reservation",
    isDisabled: false,
  },
  {
    title: "زمان اسکان",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    id: 3,
    stringId: "Delivery",
    isDisabled: isDeliveryDisabled,
  },
  //Todo[Atefeh]: uncomment if needed in the future
  // {
  //   title: "زمان تمدید",
  //   startDate: "",
  //   startTime: "",
  //   endDate: "",
  //   endTime: "",
  //   id: 4,
  //   stringId: "Extension",
  //   isDisabled: true,
  // },
];

export const ADMISSION_CAN_DEBT: Record<string, string> = {
  1: "بله",
  2: "خیر",
};

//نوع رزرو
export const ADMISSION_RESERVATION_TYPES = {
  certain: 1, // قطعی
};
