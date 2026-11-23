import { Dayjs } from "dayjs";

// !LAYOUT
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

export type MultiFoodMultiDayAllFoodScheduleListsProps = {
  setFoodInfo: React.Dispatch<React.SetStateAction<foodInfoType[]>>;
  foodInfo: foodInfoType[];
  contractId: number;
  dates: Dayjs[];
};

export type StepTwoAddAndEditFormType = {
  foodScheduleType: SelectType;
  food: SelectType;
  meal: SelectType;
  price: number;
  hasLimit: SelectType;
  maxReserveCount?: string;
  foodTotalCount?: string;
};

export type TitleIdType = {
  id: number;
  title: string;
};

export type foodInfoType = {
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

export type EditFoodModalType = {
  isOpen: boolean;
  foodData: foodInfoType | null;
};
