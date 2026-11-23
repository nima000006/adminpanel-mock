import secondFloorBed from "@assets/images/dormitory/secondFloorBed.svg";
import singleFloorBed from "@assets/images/dormitory/singleFloorBed.svg";
import sleepEarth from "@assets/images/dormitory/sleepEarth.svg";
import threeFloorBed from "@assets/images/dormitory/threeFloorBed.svg";

export const CONFIRM_REQUEST_BED_IMAGE_MAP = {
  SINGLE_FLOOR: singleFloorBed,
  SECOND_FLOOR: secondFloorBed,
  THREE_FLOOR: threeFloorBed,
  SLEEPING_GROUND: sleepEarth,
  DOUBLE: singleFloorBed,
};

export const getConfirmRequestBedLocationParts = ({
  buildingTitle,
  floorTitle,
  unitTitle,
  roomType,
}: {
  buildingTitle: string;
  floorTitle: string;
  unitTitle: string;
  roomType: string;
}) => [
  { type: "label" as const, text: "ساختمان" },
  { type: "value" as const, text: buildingTitle },
  { type: "label" as const, text: "طبقه" },
  { type: "value" as const, text: floorTitle },
  { type: "label" as const, text: "واحد اقامتی" },
  { type: "value" as const, text: unitTitle },
  { type: "value" as const, text: roomType },
];
