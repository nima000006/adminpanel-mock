import { MyFoodDetailDataType } from "@pages/Food/Contracts/MyContracts/MyContractDetail/helpers/components/Foods/components/DrawerContent/FoodDetail/@types/@myContractFoodDetailDrawerContent";

export type MyFoodListTableModelProps = {
  onRemoveFoodClickHandler?: (value: number, record: string) => void;
  onAddMenuClickHandler: (record: MyFoodDetailDataType) => void;
  isDeletedEnabled?: boolean;
  isFromAdmin?: boolean;
};
