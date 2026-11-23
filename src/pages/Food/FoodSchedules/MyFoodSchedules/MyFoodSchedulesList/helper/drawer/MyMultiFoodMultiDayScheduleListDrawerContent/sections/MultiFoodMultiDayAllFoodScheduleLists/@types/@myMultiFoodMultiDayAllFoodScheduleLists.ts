import { Dayjs } from "dayjs";

// !LAYOUT
export type MyMultiFoodMultiDayAllFoodScheduleListsProps = {
  setFoodInfo: React.Dispatch<React.SetStateAction<MyFoodInfoType[]>>;
  foodInfo: MyFoodInfoType[];
  contractId: number;
  dates: Dayjs[];
};

type SelectType = {
  label: string;
  value: string;
  key: number;
  code: number;
  children: string;
  item: {
    id: number;
    title: string;
    minPrice: number;
    maxPrice: number;
    studentalPrice: number;
  };
};

export type MyFoodInfoType = {
  rowId: string;
  date: string;
  requestType: {
    id: number;
    title: string;
  };
  product: {
    id: number;
    title: string;
    maxPrice: number;
    minPrice: number;
  };
  meal: {
    id: number;
    title: string;
  };
  basePrice: number;
  discount: number;
  hasLimit: {
    id: number;
    title: string;
  };
  maxCount?: string;
  maxTotalPerPerson?: string;
  id: string;
};

export type MyStepTwoAddAndEditFormType = {
  foodScheduleType: SelectType;
  food: SelectType;
  meal: SelectType;
  price: number;
  hasLimit: SelectType;
  maxReserveCount?: string;
  foodTotalCount?: string;
};

export type MyTitleIdType = {
  id: number;
  title: string;
};

export type MyEditFoodModalType = {
  isOpen: boolean;
  foodData: MyFoodInfoType | null;
};
