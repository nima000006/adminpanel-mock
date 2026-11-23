import { FoodType } from "../../../../@types/allFoodsList";

export type AllFoodListTableModelProps = {
  onRemoveFoodClickHandler?: (value: number, record: string) => void;
  onAddMenuClickHandler: (record: FoodType) => void;
  isDeletedEnabled?: boolean;
  isFromAdmin?: boolean;
};
