import { FormInstance } from "antd";

import { GetAllBranchesResponse } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetMealAllResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

export type AllFoodsAddSchedulesDrawerContentBodyProps = {
  setFoodScheduleDate: React.Dispatch<React.SetStateAction<string | null>>;
  form: FormInstance;
  mealData: GetMealAllResponse | undefined;
  isMealDataLoading: boolean;
  universityData: GetAllBranchesResponse | undefined;
  isUniversityDataLoading: boolean;
  hasFoodCountLimit: boolean;
  foodTotalCountHandler: (value: string) => void;
  changeFoodScheduleTypeHandler: (value: string) => void;
  isFoodScheduleType: boolean;
  foodScheduleTypeData: {
    id: number;
    title: string;
  }[];
  foodData: {
    contractRestaurantTitle: string;
    contractTitle: string;
    title: string;
    id: number;
  } | null;
};
