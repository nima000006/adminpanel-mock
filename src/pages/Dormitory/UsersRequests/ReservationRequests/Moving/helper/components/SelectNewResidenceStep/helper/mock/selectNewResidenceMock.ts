import {
  SelectNewResidenceBase,
  SelectNewResidenceInfo,
} from "@pages/Dormitory/UsersRequests/ReservationRequests/Moving/helper/components/SelectNewResidenceStep/helper/components/SelectNewResidenceInfoCard/@types/@selectNewResidenceInfoCardTypes";

export const MOCK_MOVE_NOTES = ["ودیعه کمتر", "هزینه اقامتی کمتر"];

/** برای تست: "bed" | "residence" | "building" */
export const MOCK_SELECT_NEW_RESIDENCE_BASE: SelectNewResidenceBase = "building";

export const MOCK_COMPARISON_BY_BASE: Record<
  SelectNewResidenceBase,
  { current: SelectNewResidenceInfo; alternative: SelectNewResidenceInfo }
> = {
  bed: {
    current: {
      bedTitle: "تخت 002",
      bedType: "DOUBLE",
      bedPosition: "تخت پایین",
      buildingTitle: "شهید بهشتی",
      floorTitle: "طبقه 5",
      unitTitle: "VIP 002",
      roomType: "اتاق مستقل",
      depositAmount: 15_000_000,
      accommodationAmount: 10_000_000,
    },
    alternative: {
      bedTitle: "تخت 002",
      bedType: "DOUBLE",
      bedPosition: "تخت پایین",
      buildingTitle: "شهید بهشتی",
      floorTitle: "طبقه 5",
      unitTitle: "VIP 002",
      roomType: "اتاق مستقل",
      accommodationAmount: 8_000_000,
    },
  },
  residence: {
    current: {
      roomTitle: "واحد VIP 002",
      floorTitle: "طبقه 5",
      buildingTitle: "شهید بهشتی",
      roomType: "اتاق مستقل",
      depositAmount: 15_000_000,
      accommodationAmount: 10_000_000,
    },
    alternative: {
      roomTitle: "واحد 003",
      floorTitle: "طبقه 4",
      buildingTitle: "شهید بهشتی",
      roomType: "اتاق مشترک",
      accommodationAmount: 8_000_000,
    },
  },
  building: {
    current: {
      buildingTitle: "شهید بهشتی",
      capacity: "ظرفیت ۱۲۰ نفر",
      floorTitle: "۵ طبقه",
      unitTitle: "۴۰ واحد",
      depositAmount: 15_000_000,
      accommodationAmount: 10_000_000,
    },
    alternative: {
      buildingTitle: "آیت‌الله طالقانی",
      capacity: "ظرفیت ۹۰ نفر",
      floorTitle: "۴ طبقه",
      unitTitle: "۳۰ واحد",
      accommodationAmount: 8_000_000,
    },
  },
};
