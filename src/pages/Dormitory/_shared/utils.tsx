import { AiOutlineSolution } from "react-icons/ai";
import { PiFireLight, PiHourglassSimpleMedium } from "react-icons/pi";

import BedIcon from "@assets/icons/Dorm/BedIcon";
import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import RoomIcon from "@assets/icons/Dorm/RoomIcon";

// درخواست های باز
export const ReservationOpeningRequestsStatus = {
  pendingExtension: "1", //در انتظار تمدید
  pendingReview: "2", // درانتظار بررسی
  pendingDelivery: "3", //درانتظار تحویل
  pendingResidenceStart: "4", // "درانتظار شروع اسکان تمدیدی"
};

// درخواست های پایان یافته
export const ReservationCompletedRequestsStatus = {
  accommodationCompleted: "5", // اتمام اسکان
  rejected: "6", //رد شده
  expired: "7", //منقضی شده
  cancelled: "8", //لغو شده
};

//  همه درخواست ها
export const RESERVATION_ALL_REQUESTS_STATUS = {
  pendingExtension: ReservationOpeningRequestsStatus.pendingExtension, //در انتظار تمدید
  pendingReview: ReservationOpeningRequestsStatus.pendingReview, // درانتظار بررسی
  pendingDelivery: ReservationOpeningRequestsStatus.pendingDelivery, //درانتظار تحویل
  pendingResidenceStart: ReservationOpeningRequestsStatus.pendingResidenceStart, //درانتظار شروع اسکان تمدیدی

  accommodationCompleted: ReservationCompletedRequestsStatus.accommodationCompleted, // اتمام اسکان
  rejected: ReservationCompletedRequestsStatus.rejected, //رد شده
  expired: ReservationCompletedRequestsStatus.expired, //منقضی شده
  cancelled: ReservationCompletedRequestsStatus.cancelled, //لغو شده
  all: "9", // همه
  inResidence: "10", //در حال سکونت
};

export const RESERVATION_ALL_REQUESTS_STATUS_COLOR = {
  [RESERVATION_ALL_REQUESTS_STATUS.pendingReview]: "--yellow", // درانتظار بررسی
  [RESERVATION_ALL_REQUESTS_STATUS.pendingDelivery]: "--purple-6", //درانتظار تحویل
  [RESERVATION_ALL_REQUESTS_STATUS.pendingExtension]: "--green-6", //در انتظار تمدید

  [RESERVATION_ALL_REQUESTS_STATUS.accommodationCompleted]: "--volcano-6", // اتمام اسکان
  [RESERVATION_ALL_REQUESTS_STATUS.rejected]: "--dustred-6", //رد شده
  [RESERVATION_ALL_REQUESTS_STATUS.expired]: "--neutral-11", //منقضی شده
  [RESERVATION_ALL_REQUESTS_STATUS.cancelled]: "--magenta-6", //لغو شده
};

//نوع زمان بندی
export const DORMITORY_SCHEDULE_TYPE = {
  daily: 1,
  monthly: 2,
  term: 3,
};

export const DORMITORY_SCHEDULE_TYPE_TEXT = {
  [DORMITORY_SCHEDULE_TYPE.daily]: "روزانه",
  [DORMITORY_SCHEDULE_TYPE.monthly]: "ماهانه",
  [DORMITORY_SCHEDULE_TYPE.term]: "ترمیک / دوره‌ای",
};

export const DORMITORY_SCHEDULE_TYPE_COLOR = {
  [DORMITORY_SCHEDULE_TYPE.daily]: "#722ED1",
  [DORMITORY_SCHEDULE_TYPE.monthly]: "#2F54EB",
  [DORMITORY_SCHEDULE_TYPE.term]: "#1890FF",
};

// مبنای رزرو
export const DORMITORY_RESERVATION_BASE = {
  bed: 1,
  accommodationUnit: 2,
  building: 3,
};

export const DORMITORY_RESERVATION_BASE_ICON = {
  [DORMITORY_RESERVATION_BASE.bed]: <BedIcon size="20" />,
  [DORMITORY_RESERVATION_BASE.accommodationUnit]: <RoomIcon size="20" />,
  [DORMITORY_RESERVATION_BASE.building]: <BuildingIcon size="20" />,
};

// نوع رزرو
export const DORMITORY_RESERVE_TYPE = {
  requestedReservation: 1, // رزرو درخواستی
  urgentReservation: 2, //رزرو فوری
  manualReservation: 3, //رزرو دستی
};

export const DORMITORY_RESERVE_TYPE_COLOR = {
  [DORMITORY_RESERVE_TYPE.requestedReservation]: "#FAAD14",
  [DORMITORY_RESERVE_TYPE.urgentReservation]: "#F5222D",
  [DORMITORY_RESERVE_TYPE.manualReservation]: "#722ED1",
};

export const DORMITORY_RESERVE_TYPE_ICON = {
  [DORMITORY_RESERVE_TYPE.requestedReservation]: (
    <PiHourglassSimpleMedium
      color={DORMITORY_RESERVE_TYPE_COLOR[DORMITORY_RESERVE_TYPE.requestedReservation]}
    />
  ),
  [DORMITORY_RESERVE_TYPE.urgentReservation]: (
    <PiFireLight
      color={DORMITORY_RESERVE_TYPE_COLOR[DORMITORY_RESERVE_TYPE.urgentReservation]}
    />
  ),
  [DORMITORY_RESERVE_TYPE.manualReservation]: (
    <AiOutlineSolution
      color={DORMITORY_RESERVE_TYPE_COLOR[DORMITORY_RESERVE_TYPE.manualReservation]}
    />
  ),
};
