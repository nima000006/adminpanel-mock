//! LAYOUT
export type AllFoodsAddScheduleDrawerContentProps = {
  closeDrawerHandler: () => void;
  foodData: {
    contractRestaurantTitle: string;
    contractTitle: string;
    title: string;
    id: number;
  } | null;
};

type SelectType = {
  key: string;
  value: string;
  title: string;
  name: string;
  code: number;
  item: {
    id: number;
    title: string;
  };
};

export type FormData = {
  activeMode: boolean;
  reserveDate: string;
  self: SelectType;
  contract: SelectType;
  meal: SelectType;
  foodScheduleType: SelectType;
  food: SelectType;
  universityUnit: SelectType[];
  discount: string;
  price: string;
  maxReserveCount: string;
  hasLimit: SelectType;
  foodTotalCount: string;
  reservationStartTime: string;
  reservationStartDate: string;
  reservationEndTime: string;
  reservationEndDate: string;
  deliverStartTime: string;
  deliverStartDate: string;
  deliverEndTime: string;
  deliverEndDate: string;
  id: number;
};
