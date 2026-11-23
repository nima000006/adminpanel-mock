import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CateringAllFoodSideDishesCreateDrawerContentProps = {
  closeDrawerHandler: () => void;
  onSuccess: () => void;
};

export type CateringAllFoodSideDishesCreateDrawerFormType = {
  sideDish?: SelectType<IdTitle>;
  adminDisplayTitle?: string;
  userDisplayTitle?: string;
  price?: number;
  contract?: SelectType<IdTitle>;
  description?: string;
};
