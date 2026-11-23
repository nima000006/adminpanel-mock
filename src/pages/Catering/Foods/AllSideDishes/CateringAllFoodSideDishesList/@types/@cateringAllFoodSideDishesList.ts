import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { CateringAllFoodSideDishesListViewHistoryRecordType } from "@pages/Catering/Foods/AllSideDishes/CateringAllFoodSideDishesList/helper/drawer/CateringAllFoodSideDishesListViewDrawerContent/@types/@cateringAllFoodSideDishesListViewDrawerContent";

export type CateringAllFoodSideDishesListAdvanceFilterFormType = {
  baseProduct?: SelectType<IdTitle>[];
  contract?: SelectType<IdTitle>[];
  restaurant?: SelectType<IdTitle>[];
  vendor?: SelectType<IdTitle>[];
};

export type CateringAllFoodSideDishesListAdvanceFilterParams = {
  advanceModalOpen: boolean;
};

export type CateringAllFoodSideDishesListTableModelProps = {
  onView: (record: number) => void;
  onEdit: (record: number) => void;
  onDeActive: (record: number) => void;
};

export type CateringAllFoodSideDishesListViewHistoryTableModelProps = {
  onViewHandler?: (record: CateringAllFoodSideDishesListViewHistoryRecordType) => void;
};
