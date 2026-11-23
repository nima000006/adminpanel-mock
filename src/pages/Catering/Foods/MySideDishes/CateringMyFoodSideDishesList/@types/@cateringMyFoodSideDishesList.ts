import { IdTitle, SelectType } from "@pages/_shared/@types/@generalTypes/@generalTypes";
import { CateringMyFoodSideDishesListViewHistoryRecordType } from "@pages/Catering/Foods/MySideDishes/CateringMyFoodSideDishesList/helper/drawer/CateringMyFoodSideDishesListViewDrawerContent/@types/@cateringMyFoodSideDishesListViewDrawerContent";

export type CateringMyFoodSideDishesListAdvanceFilterFormType = {
  baseProduct?: SelectType<IdTitle>[];
  contract?: SelectType<IdTitle>[];
  restaurant?: SelectType<IdTitle>[];
  vendor?: SelectType<IdTitle>[];
};

export type CateringMyFoodSideDishesListTableModelProps = {
  onView: (record: number) => void;
  onEdit: (record: number) => void;
  onDeActive: (record: number) => void;
};

export type CateringMyFoodSideDishesListViewHistoryTableModelProps = {
  onViewHandler?: (record: CateringMyFoodSideDishesListViewHistoryRecordType) => void;
};
