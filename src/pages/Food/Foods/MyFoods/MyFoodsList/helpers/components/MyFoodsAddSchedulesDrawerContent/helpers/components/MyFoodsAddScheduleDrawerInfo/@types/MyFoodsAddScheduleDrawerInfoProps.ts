import { FormInstance } from "antd";

import { GetAllBranchesResponse } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { GetMealAllResponse } from "@pages/Food/Vendors/AllVendors/AllVendorList/helper/drawer/AllVendorListDrawerContent/@types/@allVendorListDrawerContent";

export type MyFoodsAddScheduleDrawerInfoProps = {
  form: FormInstance;
  setFoodScheduleDate: React.Dispatch<React.SetStateAction<string | null>>;
  mealData: GetMealAllResponse | undefined;
  isMealDataLoading: boolean;
  universityData: GetAllBranchesResponse | undefined;
  isUniversityDataLoading: boolean;
  setHasFoodCountLimit: React.Dispatch<React.SetStateAction<boolean>>;
  hasFoodCountLimit: boolean;
  setIsFoodScheduleType: React.Dispatch<React.SetStateAction<boolean>>;
  isFoodScheduleType: boolean;
  foodData: {
    contractRestaurantTitle: string;
    contractTitle: string;
    title: string;
    id: number;
  } | null;
};
