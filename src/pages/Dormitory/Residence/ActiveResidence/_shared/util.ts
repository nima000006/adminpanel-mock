import {
  PiFireLight,
  PiHourglassMedium,
  PiNumberCircleOne,
  PiNumberCircleThreeLight,
  PiNumberCircleTwoLight,
  PiRug,
  PiUsersLight,
} from "react-icons/pi";

export const BED_TYPE = {
  DOUBLE: {
    label: "دو نفره",
    icon: PiUsersLight,
    color: "magenta",
  },
  FLOOR: {
    label: "کف خواب",
    icon: PiRug,
    color: "red",
  },
  SINGLE: {
    label: "تک طبقه",
    icon: PiNumberCircleOne,
    color: "blue",
  },
  TWO_STORY: {
    label: "دو طبقه",
    icon: PiNumberCircleTwoLight,
    color: "geekblue",
  },
  THREE_STORY: {
    label: "سه طبقه",
    icon: PiNumberCircleThreeLight,
    color: "volcano",
  },
};

export const SegmentViewMode = {
  residenceInfo: "0",
  admission: "1",
};

export const RESERVE_TYPE = {
  UrgentReserve: {
    label: "رزرو فوری",
    icon: PiFireLight,
    color: "red",
  },
  ReservationRequest: {
    label: "رزرو درخواستی",
    icon: PiHourglassMedium,
    color: "gold",
  },
};

export const PAYMENT_OPTION = {
  OncePayment: {
    label: "پرداخت یکجا",
    color: "green",
  },
  AllPayment: {
    label: "پراخت قسطی و یکجا",
    color: "purple",
  },
  InstallmentPayment: {
    label: "پراخت قسطی",
    color: "orange",
  },
};

export const SegmentViewBuildingMode = {
  buildingInfo: "0",
  facilityBuilding: "1",
};
