export type CateringMyFoodListCreateDrawerMode = "create" | "edit";

export type CateringMyFoodListCreateDrawerState = {
  open: boolean;
  mode: CateringMyFoodListCreateDrawerMode;
  foodId?: number | null;
};

export type CateringMyFoodListCreateDrawerProps = {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  mode?: CateringMyFoodListCreateDrawerMode;
  foodId?: number | null;
};
