export type CateringAllFoodListCreateDrawerMode = "create" | "edit";

export type CateringAllFoodListCreateDrawerState = {
  open: boolean;
  mode: CateringAllFoodListCreateDrawerMode;
  foodId?: number | null;
};

export type CateringAllFoodListCreateDrawerProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode?: CateringAllFoodListCreateDrawerMode;
  foodId?: number | null;
};
