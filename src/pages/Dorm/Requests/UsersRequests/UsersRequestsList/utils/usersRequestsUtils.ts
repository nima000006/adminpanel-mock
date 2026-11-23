export const usersListStatus = {
  pendingReview: 1, // در انتظار بررسی
  pendingPayment: 2, // تایید شده، در انتظار پرداخت
  confirmed: 8, // پرداخت شده
  delivered: 9, // تحویل داده شده
  cancellation: "1,2,3", // کنسلی
  cancelledGroup: 3 | 5 | 7, //for use in the cancellation and cancelled tables, it is like the "cancelled" items in next key
  cancelled: "3,5,7", // ابطال شده: شامل هر سه وضعیت 3- رد شده، 5- منقضی شده و 7- لغو شده می باشد.
  pendingList: 6, // لیست انتظار خوابگاه
};

// نوع درخواست
export const usersListRequestType = {
  reservation: 1, // رزرو
  extension: 9, // تمدید
  relocation: 10, // جابجایی
};

//  نوع زمانبندی
export const usersListSchedulingType = {
  termly: 1,
  monthly: 2,
  daily: 3,
};

//  نوع رزرو
export const usersListReservationType = {
  certain: 1, // قطعی
  uncertaintyWithBed: 2, // غیرقطعی با تخت
  uncertaintyDormitory: 3, // غیرقطعی خوابگاه
};

// گروه کاربری
export const usersListUserGroup = {
  student: 1, // دانشجو
  teacher: 2, // استاد
  employee: 3, // کارمند
};

//  جنسیت
export const usersListGenderType = {
  male: 1, // آقا
  female: 2, // خانم
  married: 5, // متاهلی
};
