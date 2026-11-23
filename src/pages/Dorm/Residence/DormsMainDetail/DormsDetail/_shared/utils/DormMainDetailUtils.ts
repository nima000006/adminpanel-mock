import BedIcon from "@assets/icons/Dorm/BedIcon";
import BuildingIcon from "@assets/icons/Dorm/BuildingIcon";
import FloorIcon from "@assets/icons/Dorm/FloorIcon";
import RoomIcon from "@assets/icons/Dorm/RoomIcon";

export const ActiveModeTag = (ActiveModeTagType: number) => {
  switch (ActiveModeTagType) {
    case 1:
      return "فعال قابل نمایش";
    case 2:
      return "فعال غیر قابل نمایش";
    case 3:
      return "غیر فعال";
  }
};

export const CARD_TYPE = {
  building: "1",
  floor: "2",
  room: "3",
  bed: "4",
};

export const cardList = [
  {
    icon: BuildingIcon,
    title: "ساختمان",
    type: CARD_TYPE?.building,
  },
  {
    icon: FloorIcon,
    title: "طبقه",
    type: CARD_TYPE?.floor,
  },
  {
    icon: RoomIcon,
    title: "اتاق",
    type: CARD_TYPE?.room,
  },
  {
    icon: BedIcon,
    title: "تخت",
    type: CARD_TYPE?.bed,
  },
];

// do not change order, the order is important on dormCreateAndModify page
export const dormRecordsStatus = [
  {
    id: 1,
    title: "فعال قابل نمایش",
  },
  {
    id: 2,
    title: "فعال غیرقابل نمایش",
  },
  {
    id: 3,
    title: "غیرفعال",
  },
];
