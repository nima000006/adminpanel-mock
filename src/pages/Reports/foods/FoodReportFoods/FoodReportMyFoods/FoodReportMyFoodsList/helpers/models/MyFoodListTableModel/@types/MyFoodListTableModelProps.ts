import { FoodDataType } from "../../../../@types/myFoodList";

export type MyFoodListTableModelProps = {
  onRemoveFoodClickHandler?: (value: number, record: string) => void;
  onAddMenuClickHandler: (record: FoodDataType) => void;
  isDeletedEnabled?: boolean;
  isFromAdmin?: boolean;
};
