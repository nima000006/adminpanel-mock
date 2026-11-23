// گروه کاربری
export const getUserGroupLabel = (userGroup: number) => {
  switch (userGroup) {
    case 0:
      return "دانشجویان";
    case 1:
      return "اساتید";
    case 2:
      return "کارکنان";
    default:
      return "";
  }
};

//جنسیت
export const getGenderLabel = (gender: number) => {
  switch (gender) {
    case 0:
      return "آقایان";
    case 1:
      return "بانوان";
    default:
      return "";
  }
};

// نوع درخواست
export const UserRequestsRequestType = {
  reserve: 1, //رزرو
  extension: 2, //تمدید
  displacement: 3, //جابجایی
};
export const getRequestTypeLabel = (requestType: number) => {
  switch (requestType) {
    case 1:
      return "رزرو";
    case 2:
      return "تمدید";
    case 3:
      return "جابجایی";
    default:
      return "";
  }
};

// نوع رزرو
export const UserRequestsReservationType = {
  dormReservation: 1, // رزرو خوابگاه
  definiteRoomReservation: 2, // رزرو قطعی اتاق
  inDefiniteRoomReservation: 3, //رزرو غیر قطعی اتاق
};

export const getReservationTypeLabel = (reservationType: number) => {
  switch (reservationType) {
    case 1:
      return "رزرو خوابگاه";
    case 2:
      return " رزرو قطعی اتاق";
    case 3:
      return "رزرو غیر قطعی اتاق";
    default:
      return "";
  }
};

// نوع زمان بند ی
export const getSchedulingTypeLabel = (reservationType: number) => {
  switch (reservationType) {
    case 1:
      return "ترمیک";
    case 2:
      return "ماهانه";
    case 3:
      return "روزانه";
    default:
      return "";
  }
};

export const usersRequestsAdmissionTabDateTableCreator = (data: any) => {
  if (!data) return [];
  return [
    {
      title: "زمان رزرو",
      startDate: data?.reservationStartDate,
      startTime: data?.reservationStartTime,
      endDate: data?.reservationEndDate,
      endTime: data?.reservationEndTime,
      id: 1,
    },
    {
      title: "زمان اسکان",
      startDate: data?.deliveryDate,
      startTime: data?.deliveryTimeStart,
      endDate: data?.deliveryDateEnd,
      endTime: data?.deliveryTimeEnd,
      id: 2,
    },
  ];
};
