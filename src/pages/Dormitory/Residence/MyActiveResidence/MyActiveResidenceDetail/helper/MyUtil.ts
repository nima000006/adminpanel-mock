import { BsBadgeWcFill } from "react-icons/bs";
import { MdGrass } from "react-icons/md";
import {
  PiBandaidsFill,
  PiBookFill,
  PiFireExtinguisherBold,
  PiMosqueFill,
  PiSoccerBallFill,
} from "react-icons/pi";
import { RiSofaFill } from "react-icons/ri";

import doubleBed from "../../../../../../assets/images/dormitory/doubleBed.svg";
import secondFloorBed from "../../../../../../assets/images/dormitory/secondFloorBed.svg";
import singleFloorBed from "../../../../../../assets/images/dormitory/singleFloorBed.svg";
import sleepEarth from "../../../../../../assets/images/dormitory/sleepEarth.svg";
import threeFloorBed from "../../../../../../assets/images/dormitory/threeFloorBed.svg";

export const RESIDENCE_ACTIVE_DETAIL_TABS_TYPE = {
  building: "BUILDING",
  floor: "FLOOR",
  unit: "UNIT",
  bed: "BED",
};

export const FACILITY_TYPE = {
  EDUCATIONAL: {
    label: "آموزشی",
    icon: PiBookFill,
    color: "magenta",
  },
  RELIGIOUS_CULTURAL: {
    label: "مذهبی و فرهنگی",
    icon: PiMosqueFill,
    color: "geekblue",
  },

  HEALTH: {
    label: "سلامت",
    icon: PiBandaidsFill,
    color: "cyan",
  },
  SANITARY: {
    label: "بهداشتی",
    icon: BsBadgeWcFill,
    color: "volcano",
  },
  SAFETY: {
    label: "ایمنی",
    icon: PiFireExtinguisherBold,
    color: "purple",
  },
  WELFARE: {
    label: "رفاهی",
    icon: RiSofaFill,
    color: "orange",
  },
  SPORTS: {
    label: "ورزشی",
    icon: PiSoccerBallFill,
    color: "blue",
  },
  GREEN_SPACE: {
    label: "فضای سبز",
    icon: MdGrass,
    color: "green",
  },
};

export const SegmentViewFloorMode = {
  floorInfo: "0",
  facilityFloor: "1",
};

export const SegmentViewUnitMode = {
  unitInfo: "0",
  facilityUnit: "1",
};

export const SELECT_BED_TYPE = {
  singleFloor: "SINGLE",
  secondFloor: "TWO_STORY",
  threeFloor: "THREE_STORY",
  sleepEarth: "FLOOR",
  double: "DOUBLE",
};

export const BED_POSITION = {
  lower: "LOWER",
  middle: "MIDDLE",
  upper: "UPPER",
} as const;

/** Mock floor options for create-floor select (no API): 5 negative + همکف + 40 positive floors */
const NEGATIVE_FLOOR_COUNT = 5;
const POSITIVE_FLOOR_COUNT = 40;

const PERSIAN_FLOOR_NUMBERS: Record<number, string> = {
  1: "یک",
  2: "دو",
  3: "سه",
  4: "چهار",
  5: "پنج",
  6: "شش",
  7: "هفت",
  8: "هشت",
  9: "نه",
  10: "ده",
  11: "یازده",
  12: "دوازده",
  13: "سیزده",
  14: "چهارده",
  15: "پانزده",
  16: "شانزده",
  17: "هفده",
  18: "هجده",
  19: "نوزده",
  20: "بیست",
  21: "بیست و یک",
  22: "بیست و دو",
  23: "بیست و سه",
  24: "بیست و چهار",
  25: "بیست و پنج",
  26: "بیست و شش",
  27: "بیست و هفت",
  28: "بیست و هشت",
  29: "بیست و نه",
  30: "سی",
  31: "سی و یک",
  32: "سی و دو",
  33: "سی و سه",
  34: "سی و چهار",
  35: "سی و پنج",
  36: "سی و شش",
  37: "سی و هفت",
  38: "سی و هشت",
  39: "سی و نه",
  40: "چهل",
};

export const FLOOR_NUMBER_OPTIONS = [
  ...Array.from({ length: NEGATIVE_FLOOR_COUNT }, (_, index) => {
    const floorNumber = -(index + 1);
    return {
      id: floorNumber,
      title: `منفی ${PERSIAN_FLOOR_NUMBERS[Math.abs(floorNumber)]}`,
    };
  }).reverse(),
  {
    id: 0,
    title: "همکف",
  },
  ...Array.from({ length: POSITIVE_FLOOR_COUNT }, (_, index) => {
    const floorNumber = index + 1;
    return {
      id: floorNumber,
      title: `طبقه ${PERSIAN_FLOOR_NUMBERS[floorNumber]}`,
    };
  }),
];

export const BED_TYPE_IMG: Record<string, string> = {
  [SELECT_BED_TYPE.singleFloor]: singleFloorBed,
  [SELECT_BED_TYPE.secondFloor]: secondFloorBed,
  [SELECT_BED_TYPE.threeFloor]: threeFloorBed,
  [SELECT_BED_TYPE.sleepEarth]: sleepEarth,
  [SELECT_BED_TYPE.double]: doubleBed,
};
