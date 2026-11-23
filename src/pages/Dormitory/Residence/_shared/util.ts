import { HiShoppingBag } from "react-icons/hi";
import { MdGrass } from "react-icons/md";
import {
  PiBookFill,
  PiBus,
  PiFilmStripDuotone,
  PiSoccerBallFill,
  PiStorefrontFill,
  PiTaxi,
  PiTrainFill,
  PiTreeFill,
} from "react-icons/pi";

export const RESIDENCE_TABS_TYPE = {
  active: "1",
  returned: "2",
  waiting: "3",
  rejected: "4",
  cancelled: "5",
  confirmed: "6",
} as const;

export const NEARBY_PLACE_TYPE = {
  PARK: {
    label: "پارک",
    icon: PiTreeFill,
  },
  GREEN_SPACE: {
    label: "فضای سبز",
    icon: MdGrass,
  },
  TAXI: {
    label: "ایستگاه تاکسی",
    icon: PiTaxi,
  },
  BRT: {
    label: "ایستگاه BRT",
    icon: PiBus,
  },
  BUSS: {
    label: "ایستگاه اتوبوس",
    icon: PiBus,
  },
  METRO: {
    label: "ایستگاه مترو",
    icon: PiTrainFill,
  },
  SHOPPING: {
    label: "مرکز خرید و فروشگاه",
    icon: HiShoppingBag,
  },
  FRUIT_MARKET: {
    label: "میدان میوه و تره‌بار",
    icon: PiStorefrontFill,
  },
  CINEMA: {
    label: "سینما",
    icon: PiFilmStripDuotone,
  },
  STADIUM: {
    label: "ورزشگاه",
    icon: PiSoccerBallFill,
  },
  LIBRARY: {
    label: "کتابخانه",
    icon: PiBookFill,
  },
} as const;

export const RESIDENCE_STATUS_CONFIG = {
  [RESIDENCE_TABS_TYPE.active]: {
    title: "فعال",
    name: "ACTIVE",
    color: "green",
  },
  [RESIDENCE_TABS_TYPE.returned]: {
    title: "عودت شده",
    name: "RETURNED",
    color: "orange",
  },
  [RESIDENCE_TABS_TYPE.waiting]: {
    title: "در انتظار بررسی",
    name: "PENDING_REVIEW",
    color: "gold",
  },
  [RESIDENCE_TABS_TYPE.rejected]: {
    title: "رد شده",
    name: "REJECTED",
    color: "red",
  },
  [RESIDENCE_TABS_TYPE.cancelled]: {
    title: "لغو شده",
    name: "CANCELED",
    color: "volcano",
  },
  [RESIDENCE_TABS_TYPE.confirmed]: {
    title: "تایید شده",
    name: "INACTIVE",
    color: "green",
  },
} as const;
