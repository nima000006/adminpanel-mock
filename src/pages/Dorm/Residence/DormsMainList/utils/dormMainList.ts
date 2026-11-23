export const activeTab = {
  DORM: "1",
  Requests: "2",
};

export const RequestTypeMode = (RequestTypeModeType: number) => {
  switch (RequestTypeModeType) {
    case 1:
      return "ایجاد کردن";
    case 2:
      return "غیر فعال کردن";
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

export const dormRequestStatusColor: Record<number, string> = {
  1: "default", //در انتظار بررسی
  2: "green", //تایید شده
  3: "red", //رد شده
  4: "gold", //عودت شده
};
