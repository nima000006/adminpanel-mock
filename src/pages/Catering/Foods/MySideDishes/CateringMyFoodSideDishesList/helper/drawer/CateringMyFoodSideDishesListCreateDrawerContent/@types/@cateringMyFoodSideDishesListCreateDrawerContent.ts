import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";

export type CateringMyFoodSideDishesCreateDrawerContentProps = {
  closeDrawerHandler: () => void;
  onSuccess: () => void;
};

export type CateringMyFoodSideDishesCreateDrawerFormType = {
  sideDish?: SelectType<IdTitle>;
  adminDisplayTitle?: string;
  userDisplayTitle?: string;
  price?: number;
  contract?: SelectType<IdTitle>;
  description?: string;
};
