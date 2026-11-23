import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import FloorIcon from "@assets/icons/Dorm/FloorIcon";
import RoomIcon from "@assets/icons/Dorm/RoomIcon";

export const displayStatusMap: Record<string, { title: string; color: string }> = {
  true: {
    title: "قابل نمایش",
    color: "green",
  },
  false: {
    title: "غیر قابل نمایش",
    color: "red",
  },
} as const;

export const facilitiesRelatedToConfig = {
  FLOOR: {
    title: "طبقه",
    icon: FloorIcon,
  },
  BUILDING: {
    title: "ساختمان",
    icon: BuildingIcon,
  },
  ROOM: {
    title: "اتاق",
    icon: RoomIcon,
  },
};

export const reasonTypeConfig = {
  RETURN: {
    title: "دلیل عودت",
    color: "yellow",
  },
  REFUSE: {
    title: "دلیل رد",
    color: "red",
  },
  REJECT: {
    title: "دلیل رد",
    color: "red",
  },
};
export const reasonDeductionAndAddTypeConfig = {
  RETURN: {
    title: "دلیل اضافات",
    color: "green",
  },
  REFUSE: {
    title: "دلیل کسورات",
    color: "red",
  },
  ADDITION: {
    title: "دلیل اضافات",
    color: "green",
  },
  DEDUCTION: {
    title: "دلیل کسورات",
    color: "red",
  },
  DISCOUNT: {
    title: "دلیل تخفیفات",
    color: "blue",
  },
};
