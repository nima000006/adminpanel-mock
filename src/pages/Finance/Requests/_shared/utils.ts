export const REQUEST_DEMAND_IDS = {
  pending: "REQUESTED", // در انتظار بررسی
  all: "4", //  همه
  confirm: "ACCEPTED", //  تایید شده
  rejected: "REJECTED", //  رد شده
};

export const financeRequestsStatusModeTag = (StatusModeType: number) => {
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

export const financeRequestsRequestStatusColor: Record<number, string> = {
  1: "gold", //در انتظار بررسی
  2: "green", //تایید شده
  3: "red", //رد شده
};
